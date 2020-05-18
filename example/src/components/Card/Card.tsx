import React from "react";

import {StyledView, StylerProps} from "style-composer";
import {$Card}                   from "./Card.style";

export interface CardProps extends StylerProps {
}

const Card = (props: CardProps) => {
  const {children, classes, style} = props;
  return <StyledView style={style} classes={[$Card, ...classes || []]}>
    {children}
  </StyledView>;
};

export default Card;