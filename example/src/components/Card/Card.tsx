import React from "react";

import {PolyView, StylerProps, classList} from "style-composer";
import {$Card}                   from "./Card.style";

export interface CardProps extends StylerProps {
}

const Card = (props: CardProps) => {
  const {children, classes, style} = props;
  return <PolyView tag={"span"} style={style} classes={classList($Card,classes)}>
    {children}
  </PolyView>;
};

export default Card;