import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import PolyTouchableHighlight    from "../../poly/native/PolyTouchableHighlight";

export const StyledTouchableHighlight: StyledComponent<PropsOf<typeof PolyTouchableHighlight>> = styled(PolyTouchableHighlight, {autoFlattens: true});

export type StyledTouchableHighlightProps = PropsOf<typeof StyledTouchableHighlight>;

export default StyledTouchableHighlight;
