import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import PolyTouchableOpacity      from "../../poly/native/PolyTouchableOpacity";

export const StyledTouchableOpacity: StyledComponent<PropsOf<typeof PolyTouchableOpacity>> = styled(PolyTouchableOpacity, {autoFlattens: true});

export type StyledTouchableOpacityProps = PropsOf<typeof StyledTouchableOpacity>;

export default StyledTouchableOpacity;
