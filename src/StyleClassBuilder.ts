import {finishRuleSession, startRuleSession}    from "./StyleRule";
import * as Utils                                   from "./Utils";
import {Style, StyleClass, Styling, StylingBuilder} from "./Styling";
import {styleToCss}                                 from "./StyleConverter";
import {finishThemeSession, startThemedSession} from "./Theming";

const extractStyleClassToCss = (styleClass: StyleClass, resolvedStyling: Styling) => {
  const parent = styleClass.__meta.parent;

  const selector = `.Styled${parent ? "." + parent.__meta.className : ""}.${styleClass.__meta.className}`;
  const body = styleToCss(resolvedStyling, {important: true});

  let css = `${selector}{${body}}`;

  const rules = styleClass.__meta.rules;
  if (rules) {
    for (const rule of Object.values(rules)) {
      const ruleStyling = resolvedStyling[rule.id];
      if (ruleStyling) {
        css += `\n${selector}.${rule.className}{${styleToCss(resolvedStyling[rule.id], {important: true})}}`;
      }
    }
  }

  Utils.setStyleSheet(styleClass.__meta.className, css);
};

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
        name:        this.name,
        parent:      parent || null,
        className:   (parent ? parent.__meta.name + "__" : "") + this.name,
        variants:    variants,
        rules:       null as any,
        hasRules:    false,
        hasThemed:   false,
        bakedStyle:  null,
        styling:     this.styling,
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
      consumeThemeProps(themedProps, 0, resolvedStyling);
      classMeta.themedProps = themedProps;
    }

    classMeta.hasRules = Object.keys(rules).length > 0;

    // if no rules or theming, bake it!
    if (!classMeta.hasRules && !classMeta.hasThemed) {
      classMeta.bakedStyle = sanitizeStylingToStyle(resolvedStyling);
    }

    if (!Utils.isNative()) {
      extractStyleClassToCss(styledClass, resolvedStyling);
    }

    return Object.assign(styledClass, variants);
  }
}

const sanitizeStylingToStyle = (styling: Styling) : Style => {
  return Object.keys(styling).reduce((style: any, key: any) => {
    const value = styling[key];
    if (typeof key === "string" && typeof value !== "object" && typeof value !== "function") {
      style[key] = value;
    }
    return style;
  }, {} as Style);
}

const consumeThemeProps = (themedProps: Record<number, string[]>, currentScope: number, styling: Styling) => {
  themedProps[currentScope] = [];
  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];
    if (typeof value === "object") {
      consumeThemeProps(themedProps, parseInt(key), value);
    } else if (typeof value === "function") {
      themedProps[currentScope].push(key);
    }
  }
};
