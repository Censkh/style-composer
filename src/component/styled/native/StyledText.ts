import {PropsOf}                 from "../../../Utils";
import PolyText                  from "../../poly/native/PolyText";
import {styled, StyledComponent} from "../StyledComponent";

export const StyledText: StyledComponent<PropsOf<typeof PolyText>> = styled(PolyText, {
  autoFlattens: true,
  needsCascade: true,
});

export type StyledTextProps = PropsOf<typeof StyledText>;

export default StyledText;
