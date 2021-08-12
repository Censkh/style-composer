import {PropsOf}                 from "../../../Utils";
import {styled, StyledComponent} from "../StyledComponent";
import PolyView                  from "../../poly/native/PolyView";

export const StyledView: StyledComponent<PropsOf<typeof PolyView>> = styled(PolyView, {autoFlattens: true});

export type StyledViewProps = PropsOf<typeof StyledView>;

export default StyledView;
