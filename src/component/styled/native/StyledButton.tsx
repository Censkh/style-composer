import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import {Button}                  from "react-native";

export const StyledButton: StyledComponent<PropsOf<typeof Button>> = styled(Button, {autoFlattens: true});

export type StyledButtonProps = PropsOf<typeof StyledButton>;

export default StyledButton;
