import {finishRuleSession, startRuleSession}    from "../rule/StyleRule";
import {Style, Styling, StylingBuilder}         from "../Styling";
import {finishThemeSession, startThemedSession} from "../theme/Theming";
import {StyleClass}                             from "./StyleClass";
import {ClassManager}                           from "./ClassManager";

export default class StyleClassBuilder<V extends Record<string, StyleClass> = {}> {

  private readonly name: string;
  private readonly styling: StylingBuilder;
  private readonly variants: Record<string, StyleClassBuilder>;

  constructor(name: string, styling: StylingBuilder) {
    this.name = name;
    this.styling = styling;
    this.variants = {};
  }

  variant<N extends string>(name: N, styling: StylingBuilder): StyleClassBuilder<V & Record<N, StyleClass>> {
    (this.variants as any)[name] = new StyleClassBuilder(name, styling);
    return this;
  }

  build(parent?: StyleClass): StyleClass<V> {
    // we pretend variants is already full so we can add a reference to it it's self when building the variants
    const variants: V = {} as any;

    const styledClass: StyleClass<any> = {
      __meta: {
        name       : this.name,
        parent     : parent || null,
        className  : (parent ? parent.__meta.name + "__" : "") + this.name,
        variants   : variants,
        rules      : null as any,
        hasRules   : false,
        hasThemed  : false,
        bakedStyle : null,
        styling    : this.styling,
        themedProps: {},
      },
    };
    const classMeta = styledClass.__meta;

    Object.keys(this.variants).forEach((key: keyof V) => {
      const variantBuilder = this.variants[key as any];
      (variants as any)[key] = variantBuilder.build(styledClass);
    });

    startThemedSession();
    startRuleSession(true);
    const resolvedStyling = classMeta.styling();
    const rules = classMeta.rules = finishRuleSession();
    const hasThemed = classMeta.hasThemed = finishThemeSession();

    // if we have themed values in this style, work out which properties they are
    if (hasThemed) {
      const themedProps: Record<number, string[]> = {};
      extractThemeProps(themedProps, 0, resolvedStyling);
      classMeta.themedProps = themedProps;
    }

    classMeta.hasRules = Object.keys(rules).length > 0;

    // if no rules or theming, bake it!
    if (!classMeta.hasRules && !classMeta.hasThemed) {
      classMeta.bakedStyle = sanitizeStylingToStyle(resolvedStyling);
    }

    ClassManager.registerClass(styledClass, resolvedStyling);

    return Object.assign(styledClass, variants);
  }
}

/**
 * Removes any theme or query rules from the styling object, leaving only actual style rules
 */
const sanitizeStylingToStyle = (styling: Styling): Style => {
  return Object.keys(styling).reduce((style: any, key: any) => {
    const value = styling[key];
    if (typeof key === "string" && typeof value !== "object" && typeof value !== "function") {
      style[key] = value;
    }
    return style;
  }, {} as Style);
};

/**
 * When the theme session run, theme property functions will return themselves instead of the current theme
 * value and using this method we collect which style rules are themed.
 *
 * Eg.
 * ```
 * () => ({
 *   color: theming.mainColor(),
 * })
 * ```
 * will return an object with:
 * ```
 * {
 *   color: theming.mainColor
 * }
 * ```
 * whilst startThemingSession() is active
 */
const extractThemeProps = (themedProps: Record<number, string[]>, currentScope: number, styling: Styling) => {
  themedProps[currentScope] = [];
  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];
    if (typeof value === "object") {
      extractThemeProps(themedProps, parseInt(key), value);
    } else if (typeof value === "function") {
      themedProps[currentScope].push(key);
    }
  }
};