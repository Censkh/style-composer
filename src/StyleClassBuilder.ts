import {finishRuleSession, startRuleSession} from "./StyleRule";
import * as Utils                            from "./Utils";
import {StyleClass, Styling, StylingBuilder} from "./Styling";
import {styleToCss}                          from "./StyleConverter";

const extractStyleClassToCss = (styleClass: StyleClass, resolvedStyling: Styling) => {
  const parent = styleClass.__meta.parent;

  const selector = `div${parent ? "." + parent.__meta.className : ""}.${styleClass.__meta.className}`;
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

  Utils.createStyleSheet(styleClass.__meta.className, css);
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

    const styledClass = {
      __meta: {
        name:      this.name,
        parent:    parent || null,
        className: (parent ? parent.__meta.name + "__" : "") + this.name,
        variants:  variants,
        rules:     null as any,
        styling:   this.styling,
      }
    };

    Object.keys(this.variants).forEach((key: keyof V) => {
      const variantBuilder = this.variants[key as any];
      (variants as any)[key] = variantBuilder.build(styledClass);
    });

    startRuleSession(true);
    const rules = styledClass.__meta.styling();
    styledClass.__meta.rules = finishRuleSession();

    if (!Utils.isNative()) {
      extractStyleClassToCss(styledClass, rules);
    }

    return Object.assign(styledClass, variants);
  }
}
