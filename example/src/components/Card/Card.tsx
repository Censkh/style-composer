import React from "react";

import {StyledProps, StyledView} from "style-composer";
import {$Card}                     from "./Card.style";

export interface CardProps extends StyledProps {
  children?: React.ReactNode;
}

const Card = (props: CardProps) => {
  const {children, classes, style} = props;
  return <StyledView tag={"span"} style={[style]} classes={[$Card, classes]}>
    {children}
  </StyledView>;
};

export default Card;
