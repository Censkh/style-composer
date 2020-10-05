import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import {SafeAreaView}            from "react-native";

export const StyledSafeAreaView: StyledComponent<PropsOf<typeof SafeAreaView>> = styled(SafeAreaView, {autoFlattens: true});

export type StyledSafeAreaViewProps = PropsOf<typeof StyledSafeAreaView>;

export default StyledSafeAreaView;
