import React                               from "react";
import {classList, StyleClass, StyledText} from "style-composer";

import {$Heading} from "./Text.style";
import {PropsOf}  from "../../../../src/Utils";

export type TextVariant = "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TextProps extends PropsOf<typeof StyledText> {
  children: React.ReactNode;
  variant?: TextVariant;
}

const Text = (props: TextProps) => {
  const {variant, classes, ...otherProps} = props;

  let headingClass: StyleClass | undefined;
  if (variant && variant !== "normal") {
    headingClass = $Heading[variant];
  }

  return <StyledText tag={variant && variant !== "normal" ? variant : undefined}
                     classes={classList(classes, headingClass)}
                     {...otherProps}/>;
};

export default React.memo(Text);
