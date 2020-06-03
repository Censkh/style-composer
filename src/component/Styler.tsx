import React, {useContext, useMemo, useRef} from "react";

import {computeClasses, extractCascadingStyle, sanitizeStyleList, Style}          from "../Styling";
import * as Utils                                                                 from "../Utils";
import {Falsy}                                                                    from "../Utils";
import {StyleClass}                                                               from "../class/StyleClass";
import {RecursiveArray, StyleSheet, Text}                                         from "react-native";
import CascadingStyleContext, {CascadingStyleContextState}                        from "../CascadingStyleContext";
import {useForceUpdate, useStylingInternals}                                      from "../Hooks";
import {addFontLoadListener, getFontFamily, isFontLoaded, removeFontLoadListener} from "../font/FontFamily";
import {PolyText}                                                                 from "./PolyComponents";
import {setupFontPreProcessor}                                                    from "../FontPreProcessor";

export type StyleProp = RecursiveArray<Style | undefined | null | false> | Style | undefined | null | false;

export interface StylableProps {
  style?: StyleProp;
  classes?: Array<StyleClass | Falsy> | StyleClass | Falsy,
}

export type StylerChildren =
  React.ReactElement<{ style: Style }>
  | string;

export interface StylerProps extends StylableProps {
  children?: StylerChildren,
  _baseComponent: React.ElementType;
}

setupFontPreProcessor();

const Styler = (props: StylerProps) => {
  const {children, style, classes, _baseComponent} = props;

  const fontListeners                                               = useRef<string[]>([]);
  const {style: parentCascadingStyle, key: parentCascadingStyleKey} = useContext(CascadingStyleContext);
  const [fontKey, forceUpdate]                                      = useForceUpdate();
  const {id, theme, key, classId, classArray}                       = useStylingInternals(classes);

  const needsCascade = _baseComponent === Text || _baseComponent === PolyText;

  const {computedStyle, cascadingStyle, cascadingStyleKey, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray);

    const ownStyle     = [classResults.style, style, typeof children !== "object" ? undefined : children?.props.style];
    const ownStyleFlat = StyleSheet.flatten(ownStyle) as Style;

    if (ownStyleFlat?.fontWeight) {
      const currentFontFamily = ownStyleFlat.fontFamily || parentCascadingStyle.fontFamily;
      if (currentFontFamily) {
        const variant = getFontFamily(currentFontFamily.split("__")[0])?.weight(ownStyleFlat?.fontWeight);
        if (variant && currentFontFamily !== variant) {
          ownStyleFlat.fontFamily = variant;
          ownStyle.push({fontFamily: variant});
        }
      }
    }

    const computedStyle     = needsCascade ? [parentCascadingStyle, ownStyle] : [ownStyle];
    const computedStyleFlat = StyleSheet.flatten(computedStyle) as Style;

    if (Utils.isNative() && computedStyleFlat.fontFamily) {
      const fontFamily = computedStyleFlat.fontFamily;
      if (!isFontLoaded(fontFamily)) {
        let callback: () => void;
        if (!fontListeners.current.includes(fontFamily)) {
          fontListeners.current.push(fontFamily);
          addFontLoadListener(fontFamily, callback = () => {
            forceUpdate();
            removeFontLoadListener(fontFamily, callback);
          });
        }
        computedStyle.push({fontFamily: "System"});
      }
    }

    const [cascadingStyle, cascadingStyleKey] = extractCascadingStyle(ownStyleFlat, parentCascadingStyle);

    return {
      classNames       : classResults.classNames,
      computedStyle    : computedStyle,
      computedStyleFlat: computedStyleFlat,
      cascadingStyle   : cascadingStyle,
      cascadingStyleKey: cascadingStyleKey,
    };
  }, [style, classId, parentCascadingStyleKey, key, fontKey, theme]);

  const memoCascadingStyle = useMemo<CascadingStyleContextState | null>(() => cascadingStyle && {
    style: cascadingStyle,
    key  : cascadingStyleKey,
  }, [cascadingStyleKey]);

  const content = !children || typeof children === "string" ? children : React.cloneElement(children, {
    style       : sanitizeStyleList(children, computedStyle as any),
    "data-class": classNames?.join(" "),
    "data-id"   : id,
  } as any);

  return memoCascadingStyle ?
    <CascadingStyleContext.Provider value={memoCascadingStyle}>
      {content}
    </CascadingStyleContext.Provider> : content as any;
};

export default Object.assign(Styler, {displayName: "Styler"});