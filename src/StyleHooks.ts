import {DependencyList, useCallback, useContext, useEffect, useMemo, useRef, useState}     from "react";
import {
  registerSelectorCallback,
  StyleSelector,
  unregisterSelectorCallback,
}                                                                                          from "./selector/StyleSelector";
import {Classes, classesId, flattenClasses, StyleClass}                                   from "./class/StyleClass";
import * as Utils                                                                          from "./Utils";
import {Falsy, isNative}                                                                   from "./Utils";
import {Theme}                                                                             from "./theme";
import {StyleProp, StyleSheet}                                                            from "react-native";
import {
  computeClasses,
  ComputedStyleList,
  computeStyling,
  extractCascadingStyle,
  resolveStyling,
  sanitizeStyleObject,
  StyledProps,
  StyleObject,
  StylingBuilder,
  StylingResolution,
  StylingSession,
} from "./Styling";
import CascadingValuesContext, {CascadingValuesContextState}                               from "./CascadingValuesContext";
import {addFontLoadListener, getFontFace, isFontLoaded, loadFont, removeFontLoadListener} from "./font/FontFace";
import child, {ChildQuery}                                                                 from "./selector/ChildSelector";
import StyleEnvironment                                                                    from "./StyleEnvironment";
import {fixStylePropTypes}                                                                 from "./StyleSheetPropTypeFixer";
import {ThemingContext}                                                                    from "./theme/Theming";

export const useForceUpdate = (): [number, () => void] => {
  const [state, setState] = useState(0);
  const forceUpdate       = useCallback(() => setState(i => i + 1), [setState]);
  return [state, forceUpdate];
};

export interface StylingInternals {
  theme: Theme,
  key: string,
  classId: string | null,
  classArray: StyleClass[] | undefined,
  uid: string;
}

export interface ComposedStyleResult {
  cascadingContextValue: CascadingValuesContextState | null;
  computedStyle: ComputedStyleList;
  flatPseudoClasses: string[],
  classNames: string[];
  appliedClasses: StyleClass[];
  computedProps: ComposedStyleResultProps
}

export interface ComposedStyleResultProps {
  style?: StyleProp<any>,
  "data-class"?: string,
  "data-pseudo-class"?: string,
  dataSet?: {
    "class"?: string,
    "pseudo-class"?: string
  },
}

export interface ComposedStyleOptions {
  needsCascade?: boolean;
  autoFlattens?: boolean;
}

fixStylePropTypes();

const findChildSelectors = (clazz: StyleClass): StyleSelector<any>[] | Falsy => {
  return clazz.__meta.hasAnySelectors && Object.values(clazz.__meta.rootScope.selectors).filter(selector => selector.type.id === child.id);
};

export const useComposedStyle = (props: StyledProps, options?: ComposedStyleOptions): ComposedStyleResult => {
  const {classes, style, pseudoClasses, dataSet: propsDataSet} = props;
  const fontListeners                                          = useRef<string[]>([]);
  const {
          style         : parentCascadingStyle,
          key           : parentCascadingValuesKey,
          childSelectors: parentChildSelectors,
        }                                                      = useContext(CascadingValuesContext);
  const [forceKey, forceUpdate]                                = useForceUpdate();

  const flatPseudoClasses       = (Array.isArray(pseudoClasses) ? Utils.flatAndRemoveFalsy(pseudoClasses) : (pseudoClasses && [pseudoClasses]) || [])
    .map(selector => typeof selector === "string" ? selector : selector.type);
  const session: StylingSession = {
    pseudoClasses           : flatPseudoClasses || [],
    applicableChildSelectors: [],
  };

  const {theme, key, classArray} = useStylingInternals(classes, session);

  const computedKey = `${key}--${parentCascadingValuesKey}--${forceKey}`;

  session.applicableChildSelectors = classArray && parentChildSelectors && parentChildSelectors.filter((selector) => {
    const options = Utils.arrayify(selector.options);
    return classArray?.some(clazz => options.includes(clazz) || options.find(other => other.__meta.className === clazz.__meta.parent?.__meta.className));
  });

  const needsCascade = Boolean(options?.needsCascade);

  const {
          sanitizedStyleList,
          cascadingStyle,
          cascadingValuesKey,
          classNames,
          ownChildSelectors,
        } = useMemo(() => {
    const classResults = computeClasses(classArray, style, session);

    const ownStyle     = classResults.style;
    const ownStyleFlat = StyleSheet.flatten(ownStyle) as StyleObject;

    if (Utils.isNative() && ownStyleFlat?.fontWeight) {
      const currentFontFamily = ownStyleFlat.fontFamily || parentCascadingStyle.fontFamily;
      if (currentFontFamily) {
        const styleComposerFontFamily = getFontFace(currentFontFamily);
        if (styleComposerFontFamily) {
          const variant = styleComposerFontFamily.weight(ownStyleFlat?.fontWeight);
          if (variant && currentFontFamily !== variant) {
            ownStyleFlat.fontFamily = variant;
            ownStyle.push({fontFamily: variant});
          }
        }
      }
    }

    const computedStyle     = needsCascade ? [parentCascadingStyle, ownStyle] : [ownStyle];
    const computedStyleFlat = StyleSheet.flatten(computedStyle) as StyleObject;
    const fontWeight        = computedStyleFlat.fontWeight;

    const [cascadingStyle, cascadingStyleKey] = extractCascadingStyle(ownStyleFlat, parentCascadingStyle);

    if (computedStyleFlat.fontFamily) {
      const fontFamily = computedStyleFlat.fontFamily;
      const fontFace   = getFontFace(fontFamily);
      if (fontFace) {
        loadFont(fontFace, fontWeight as any);
        if (Utils.isNative()) {
          if (!isFontLoaded(fontFamily)) {
            let callback: () => void;
            if (!fontListeners.current.includes(fontFamily)) {
              fontListeners.current.push(fontFamily);
              addFontLoadListener(fontFamily, callback = () => {
                forceUpdate();
                removeFontLoadListener(fontFamily, callback);
              });
            }
            computedStyleFlat.fontFamily = "System";
          } else {
            computedStyleFlat.fontWeight = "normal";
          }
        }
      }
    }

    const ownChildSelectors  = classArray?.flatMap<StyleSelector<ChildQuery> | Falsy>((clazz) => {
      return [...(findChildSelectors(clazz) || []), ...(clazz.__meta.parent && findChildSelectors(clazz.__meta.parent) || [])];
    }).filter(Boolean) as Array<StyleSelector<ChildQuery>> | undefined;
    const childSelectorsKey  = ownChildSelectors?.map(selector => selector.key).join(",");
    const cascadingValuesKey = [cascadingStyleKey || "null", childSelectorsKey || "null"].join("===");
    const sanitizedStyleList = sanitizeStyleObject(computedStyleFlat, true);

    return {
      classNames        : classResults.classNames,
      sanitizedStyleList: sanitizedStyleList,
      computedStyleFlat : computedStyleFlat,
      cascadingStyle    : cascadingStyle,
      cascadingValuesKey: cascadingValuesKey,
      ownChildSelectors : ownChildSelectors,
    };
  }, [style, computedKey, theme]);

  const hasCascade            = Boolean(cascadingStyle || (ownChildSelectors && ownChildSelectors.length > 0));
  const cascadingContextValue = useMemo<CascadingValuesContextState | null>(() => (hasCascade && {
    style         : cascadingStyle || parentCascadingStyle,
    key           : cascadingValuesKey,
    childSelectors: ownChildSelectors && ownChildSelectors.length > 0 ? [...ownChildSelectors, ...parentChildSelectors] : parentChildSelectors,
  }) || null, [cascadingValuesKey]);

  const dataSet = useMemo(() => {
    const dataSet: any = Object.assign(process.env.NODE_ENV === "development" ? {
      "class"       : classNames?.join(" "),
      "pseudo-class": flatPseudoClasses.join(" "),
    } : {}, propsDataSet);

    return dataSet;
  }, [propsDataSet, computedKey]);

  const computedProps = useMemo<ComposedStyleResultProps>(() => {
    const flatStyle = isNative() || options?.autoFlattens ? sanitizedStyleList : StyleSheet.flatten(sanitizedStyleList);

    return {
      style              : flatStyle,
      "data-class"       : dataSet["class"],
      "data-pseudo-class": dataSet["pseudo-class"],
      dataSet            : dataSet,
    };
  }, [computedKey, style]);

  return {
    computedStyle        : sanitizedStyleList as ComputedStyleList,
    cascadingContextValue: cascadingContextValue,
    classNames           : classNames,
    flatPseudoClasses    : flatPseudoClasses,
    appliedClasses       : classArray || [],
    computedProps        : computedProps,
  };
};

export const useStylingInternals = (classes: Classes | undefined, session: StylingSession): StylingInternals => {
  const uidRef = useRef(Math.floor(Math.random() * 100000000).toString());

  const {classArray, classId, hasDynamicUnit} = useMemo(() => {
    const classArray: StyleClass[] | undefined = classes && flattenClasses(classes) || undefined;
    const classId                              = classesId(classArray);
    const hasDynamicUnit                       = classArray?.some(clazz => clazz.__meta.hasAnyDynamicProps);

    return {classArray, classId, hasDynamicUnit};
  }, [classes]);

  const [forceUpdateKey, forceUpdate] = useSelectorsEffect(uidRef.current, classArray, session, classId);
  const theming                       = useContext(ThemingContext);

  useEffect(() => {
    if (hasDynamicUnit) {
      StyleEnvironment.addScreenSizeChangeListener(forceUpdate);
      return () => {
        StyleEnvironment.removeScreenSizeChangeListener(forceUpdate);
      };
    }
  }, [hasDynamicUnit]);

  const key = forceUpdateKey + "_" + classId + "_" + (session.pseudoClasses ? session.pseudoClasses.sort().join(",") : "") + "_" + theming.key;

  return {theme: theming.theme, key, classId, classArray, uid: uidRef.current};
};

const useSelectorsEffect = (id: string, classes: StyleClass[] | Falsy, session: StylingSession, classesId: string | null): [number, () => void] => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState        = useRef("");
  const currentClasses   = useRef<StyleClass[] | Falsy>();
  currentClasses.current = classes;

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentClasses.current) {
      for (const clazz of currentClasses.current) {
        for (const selector of Object.values(clazz.__meta.rootScope.selectors)) {
          state += selector.type.check(selector, session) ? "1" : "0";
        }
        state += "-";
      }
    }
    if (prevState.current !== state) {
      prevState.current = state;
      forceUpdate();
    }
  }, []);

  useEffect(() => {
    if (classes) {
      const hasSelectors = classes.some(clazz => clazz.__meta.hasAnySelectors);
      if (hasSelectors) {
        for (const clazz of classes) {
          if (clazz.__meta.hasAnySelectors) {
            for (const id of Object.keys(clazz.__meta.rootScope.selectors)) {
              const selector = clazz.__meta.rootScope.selectors[id as any];
              registerSelectorCallback(selector.type, checkForUpdates);
            }
          }
        }
        return () => {
          for (const clazz of classes) {
            if (clazz.__meta.hasAnySelectors) {
              for (const id of Object.keys(clazz.__meta.rootScope.selectors)) {
                const selector = clazz.__meta.rootScope.selectors[id as any];
                unregisterSelectorCallback(selector.type, checkForUpdates);
              }
            }
          }
        };
      }
    }
  }, [classesId, forceUpdate]);
  return [key, forceUpdate];
};

let composedId = 0;

export const useComposedValues = <S>(styling: StylingBuilder<S>, depList: DependencyList): S => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState            = useRef("");
  const currentResolution    = useRef<StylingResolution>();
  const id                   = useRef((composedId++).toString());
  const resolution           = useMemo(() => resolveStyling(`__composed_${id.current}`, styling), depList);
  currentResolution.current  = resolution;
  const {hasAnyDynamicProps} = resolution;

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentResolution.current) {
      for (const selector of Object.values(currentResolution.current.rootScope.selectors)) {
        state += selector.type.check(selector, {}) ? "1" : "0";
      }
    }
    if (prevState.current !== state) {
      prevState.current = state;
      forceUpdate();
    }
  }, []);

  useEffect(() => {
    if (hasAnyDynamicProps) {
      StyleEnvironment.addScreenSizeChangeListener(forceUpdate);
      return () => {
        StyleEnvironment.removeScreenSizeChangeListener(forceUpdate);
      };
    }
  }, [hasAnyDynamicProps]);

  useEffect(() => {
    if (resolution.hasAnySelectors) {
      for (const id of Object.keys(resolution.rootScope.selectors)) {
        const selector = resolution.rootScope.selectors[id as any];
        registerSelectorCallback(selector.type, checkForUpdates);
      }
      return () => {
        for (const id of Object.keys(resolution.rootScope.selectors)) {
          const selector = resolution.rootScope.selectors[id as any];
          unregisterSelectorCallback(selector.type, checkForUpdates);
        }
      };
    }
  }, [resolution]);

  return useMemo(() => computeStyling(resolution), [resolution, key]) as S;
};

export const useCallableEffect = <F extends (...args: any[]) => any>(effect: F, depList: DependencyList): F => {
  const func = useCallback(effect, depList);
  useEffect(func, [func]);
  return func;
};
