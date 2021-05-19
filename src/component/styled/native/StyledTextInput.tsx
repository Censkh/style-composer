import {styled, StyledComponent} from "../StyledComponent";
import {PropsOf}                 from "../../../Utils";
import {TextInput}               from "react-native";

export const StyledTextInput: StyledComponent<PropsOf<typeof TextInput>> = styled(TextInput, {autoFlattens: true, needsCascade: true});

export type StyledTextInputProps = PropsOf<typeof StyledTextInput>;

export default StyledTextInput;
