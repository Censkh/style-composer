import React        from "react";
import {StyledView} from "style-composer";
import {$Container} from "./Container.style";

export interface ContainerProps extends React.PropsWithChildren<{}> {

}

const Container = (props: ContainerProps) => {
  return <StyledView classes={$Container} {...props}/>;
};

export default Container;