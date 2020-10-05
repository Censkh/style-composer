import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import {Image}                   from "react-native";

export const StyledImage: StyledComponent<PropsOf<typeof Image>> = styled(Image, {autoFlattens: true});

export type StyledImageProps = PropsOf<typeof StyledImage>;

export default StyledImage;
