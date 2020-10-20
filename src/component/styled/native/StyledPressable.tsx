import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import PolyPressable             from "../../poly/native/PolyPressable";

export const StyledPressable: StyledComponent<PropsOf<typeof PolyPressable>> = styled(PolyPressable, {autoFlattens: true});

export type StyledPressableProps = PropsOf<typeof StyledPressable>;

export default StyledPressable;
