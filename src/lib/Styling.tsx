import React                                                    from "react";
import Styler, {StylerProps}                                    from "./Styler";
import {ImageStyle, TextStyle, View, Text, ViewStyle}           from "react-native";
import {finishRuleSession, startRuleSession, StyleRuleInstance} from "./StyleRule";

if (process.env.NODE_ENV === "development") {
  const actualError = console.error;
  console.error = function (...args: any[]) {
    if (args.length > 0 && typeof args[0] === "string") {
      if (args[0].startsWith("Warning: Failed prop type: Invalid props.style key")) {
        return;
      }
    }
    return actualError.apply(this, args as any);
  };
}

export type Style = ViewStyle & TextStyle & ImageStyle & { boxShadow?: string };

export function styled<P>(baseComponent: React.ComponentType<P>): React.ComponentType<P & StylerProps> {
  return (props) => {
    const {children, classes, ...otherProps} = props;
    return <Styler
      classes={classes}>{React.createElement(baseComponent, otherProps as any, children) as any}</Styler>;
  };
}

export type StylingBuilder = () => Styling;

export type Styling = Style & Record<number, Style>;

export type StyledClass<V extends Record<string, StyledClass> = {}> = V & {
  __meta: {
    name: string;
    parent: StyledClass | null;
    resolvedStyling: Styling;
    rules: Record<number, StyleRuleInstance>,
    styling: StylingBuilder | null;
    variants: V | null;
  }
}

export interface StyledClassOptions {
  styling?: StylingBuilder;
}

export class StyledClassBuilder<V extends Record<string, StyledClass> = {}> {

  private readonly name: string;
  private readonly options: StyledClassOptions;
  private readonly variants: Record<string, StyledClassBuilder>;

  constructor(name: string, options?: StyledClassOptions) {
    this.name = name;
    this.options = options || {};
    this.variants = {};
  }

  variant<N extends string>(name: N, options?: StyledClassOptions): StyledClassBuilder<V & Record<N, StyledClass>> {
    (this.variants as any)[name] = new StyledClassBuilder(name, options);
    return this;
  }

  build(parent?: StyledClass): StyledClass<V> {
    // we pretend variants is already full so we can add a reference to it it's self when building the variants
    const variants: V = {} as any;

    const styledClass = {
      __meta: {
        name:            this.name,
        parent:          parent || null,
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

    // turn {[media({minWidth: 100})]: {}} into {0: {}}

    startRuleSession();
    styledClass.__meta.resolvedStyling = styledClass.__meta.styling ? styledClass.__meta.styling() : {};
    styledClass.__meta.rules = finishRuleSession();

    //styledClass.__meta.computedStyle = computeStyle(styledClass);

    return Object.assign(styledClass, variants);
  }

}

export function classBuilder(name: string, options?: StyledClassOptions): StyledClassBuilder {
  return new StyledClassBuilder(name, options);
}

export function computeStyles(styledClass: StyledClass): Style {
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

export const StyledView = styled(View);
export const StyledText = styled(Text);