import React                    from "react";
import {StyleClass, StyledText, StyledTextProps} from "style-composer";

import {$Heading, $Text} from "./Text.style";

export type TextVariant = "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TextProps extends StyledTextProps {
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
                     classes={[$Text, classes, headingClass]}
                     {...otherProps}/>;
};

export default React.memo(Text);
