import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import {ImageBackground}         from "react-native";

export const StyledImageBackground: StyledComponent<PropsOf<typeof ImageBackground>> = styled(ImageBackground, {autoFlattens: true});

export type StyledImageBackgroundProps = PropsOf<typeof StyledImageBackground>;

export default StyledImageBackground;
