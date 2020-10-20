import {PropsOf}                   from "../../../Utils";
import PolyTouchableNativeFeedback from "../../poly/native/PolyTouchableNativeFeedback";
import {styled, StyledComponent}   from "../StyledComponent";

export const StyledTouchableNativeFeedback: StyledComponent<PropsOf<typeof PolyTouchableNativeFeedback>> = styled(PolyTouchableNativeFeedback, {autoFlattens: true});

export type StyledTouchableNativeFeedbackProps = PropsOf<typeof StyledTouchableNativeFeedback>;

export default StyledTouchableNativeFeedback;
