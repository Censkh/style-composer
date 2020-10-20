import React                         from "react";
import {findDOMNode as _findDOMNode} from "react-dom";

export const getReactNode = (ref: React.RefObject<any>): any => {
  try {
    let node = ref && (ref.current || ref);
    if (node && node.getNode && node.getNode())
      node = node.getNode();
    if (node && node._touchableNode)
      node = node._touchableNode;
    if (node && node._node)
      node = node._node;
    return node;
  } catch (error) {
    console.error("Failed to find node", error, {ref});
    return null;
  }
};

export const findDOMNode = _findDOMNode;
