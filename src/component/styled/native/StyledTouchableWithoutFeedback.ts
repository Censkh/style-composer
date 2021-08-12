import {PropsOf}                    from "../../../Utils";
import PolyTouchableWithoutFeedback from "../../poly/native/PolyTouchableWithoutFeedback";
import {styled, StyledComponent}    from "../StyledComponent";

export const StyledTouchableWithoutFeedback: StyledComponent<PropsOf<typeof PolyTouchableWithoutFeedback>> = styled(PolyTouchableWithoutFeedback, {autoFlattens: true});

export type StyledTouchableWithoutFeedbackProps = PropsOf<typeof StyledTouchableWithoutFeedback>;

export default StyledTouchableWithoutFeedback;
