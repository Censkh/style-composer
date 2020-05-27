import React from "react";

import {classList, StyledView, StylerProps} from "style-composer";
import {$Card}                              from "./Card.style";

export interface CardProps extends StylerProps {
}

const Card = (props: CardProps) => {
  const {children, classes, style} = props;
  return <StyledView tag={"span"} style={[style]} classes={classList($Card, classes)}>
    {children}
  </StyledView>;
};

export default Card;