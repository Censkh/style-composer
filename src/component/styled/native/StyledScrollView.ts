import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import {ScrollView}              from "react-native";

export const StyledScrollView: StyledComponent<PropsOf<typeof ScrollView>> = styled(ScrollView, {autoFlattens: true});

export type StyledScrollViewProps = PropsOf<typeof StyledScrollView>;

export default StyledScrollView;
