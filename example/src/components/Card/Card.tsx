import React from "react";

import {StylableProps, StyledView} from "style-composer";
import {$Card}                     from "./Card.style";

export interface CardProps extends StylableProps {
  children?: React.ReactNode;
}

const Card = (props: CardProps) => {
  const {children, classes, style} = props;
  return <StyledView tag={"span"} style={[style]} classes={[$Card, classes]}>
    {children}
  </StyledView>;
};

export default Card;
