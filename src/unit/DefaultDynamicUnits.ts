import {Dimensions}        from "react-native";
import {createDynamicUnit} from "./DynamicUnit";

export const vw = createDynamicUnit("vw", () => Dimensions.get("window").width);
export const vh = createDynamicUnit("vh", () => Dimensions.get("window").height);