import React                              from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import * as Utils                         from "./Utils";

import {finishRuleSession, startRuleSession, StyleRuleInstance} from "./StyleRule";
import {styleToCss}                                             from "./StyleConverter";

if (process.env.NODE_ENV === "development") {
  const actualError = console.error;
  console.error = function (...args: any[]) {
    if (args.length > 0 && typeof args[0] === "string") {
      if (args[0].startsWith("Warning: Failed prop type: Invalid props.style key") || args[0].startsWith("Warning: Using the \"className\"")) {
        return;
      }
    }
    return actualError.apply(this, args as any);
  };
}

export type Style = ViewStyle & TextStyle & ImageStyle & { boxShadow?: string };

export type StylingBuilder = () => Styling;

export type Styling = Style & Record<number, Style>;

export type StyleClass<V extends Record<string, StyleClass> = {}> = V & {
  __meta: {
    name: string;
    className: string;
    parent: StyleClass | null;
    resolvedStyling: Styling;
    rules: Record<number, StyleRuleInstance>,
    styling: StylingBuilder | null;
    variants: V | null;
  }
}


export interface StyledClassOptions {
  styling?: StylingBuilder;
}

export class StyleClassBuilder<V extends Record<string, StyleClass> = {}> {

  private readonly name: string;
  private readonly options: StyledClassOptions;
  private readonly variants: Record<string, StyleClassBuilder>;

  constructor(name: string, options?: StyledClassOptions) {
    this.name = name;
    this.options = options || {};
    this.variants = {};
  }

  variant<N extends string>(name: N, options?: StyledClassOptions): StyleClassBuilder<V & Record<N, StyleClass>> {
    (this.variants as any)[name] = new StyleClassBuilder(name, options);
    return this;
  }

  build(parent?: StyleClass): StyleClass<V> {
    // we pretend variants is already full so we can add a reference to it it's self when building the variants
    const variants: V = {} as any;

    const styledClass = {
      __meta: {
        name:            this.name,
        parent:          parent || null,
        className:       (parent ? parent.__meta.name + "__" : "") + this.name,
        variants:        variants,
        rules:           null as any,
        resolvedStyling: null as any,
        styling:         this.options.styling || null,
      }
    };

    Object.keys(this.variants).forEach((key: keyof V) => {
      const variantBuilder = this.variants[key as any];
      (variants as any)[key] = variantBuilder.build(styledClass);
    });

    startRuleSession();
    styledClass.__meta.resolvedStyling = styledClass.__meta.styling ? styledClass.__meta.styling() : {};
    styledClass.__meta.rules = finishRuleSession();

    if (!Utils.isNative()) {
      extractStyleClassToCss(styledClass);
    }

    return Object.assign(styledClass, variants);
  }
}

const extractStyleClassToCss = (styleClass: StyleClass) => {
  const parent = styleClass.__meta.parent;

  const selector = `div${parent ? "." + parent.__meta.className : ""}.${styleClass.__meta.className}`;
  const body = styleToCss(styleClass.__meta.resolvedStyling, {important: true});

  let css = `${selector}{${body}}`;

  const rules = styleClass.__meta.rules;
  if (rules) {
    for (const rule of Object.values(rules)) {
      css += `\n${selector}.${rule.className}{${styleToCss(styleClass.__meta.resolvedStyling[rule.id], {important: true})}}`;
    }
  }

  Utils.createStyleSheet(styleClass.__meta.className, css);
};

export function composeClass(name: string, options?: StyledClassOptions): StyleClassBuilder {
  return new StyleClassBuilder(name, options);
}

export function computeStyles(styledClass: StyleClass): Style {
  let style: Style = {...styledClass.__meta.resolvedStyling};

  Object.values(styledClass.__meta.rules).forEach((ruleInstance) => {
    const ruleStyle = (style as any)[ruleInstance.id] as Style;
    (style as any)[ruleInstance.id] = undefined;
    if (ruleInstance.rule.check(ruleInstance.options)) {
      style = Object.assign(style, ruleStyle);
    }
  });

  return style;
}