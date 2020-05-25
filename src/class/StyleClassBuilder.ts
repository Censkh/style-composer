import {resolveStyling, StylingBuilder} from "../Styling";
import {StyleClass}                     from "./StyleClass";
import {ClassManager}                   from "./ClassManager";

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
        name          : this.name,
        parent        : parent || null,
        className     : (parent ? parent.__meta.name + "__" : "") + this.name,
        variants      : variants,
        rules         : null as any,
        hasRules      : false,
        hasThemed     : false,
        hasDynamicUnit: false,
        isSimple      : false,
        bakedStyle    : null,
        styling       : this.styling,
        dynamicProps  : {},
      },
    };
    const classMeta = styledClass.__meta;

    Object.keys(this.variants).forEach((key: keyof V) => {
      const variantBuilder = this.variants[key as any];
      (variants as any)[key] = variantBuilder.build(styledClass);
    });

    const {resolvedStyling} = Object.assign(classMeta, resolveStyling(classMeta.styling));

    ClassManager.registerClass(styledClass, resolvedStyling);

    return Object.assign(styledClass, variants);
  }
}