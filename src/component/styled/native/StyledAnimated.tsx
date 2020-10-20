import {styled}   from "../StyledComponent";
import {Animated} from "react-native";

export const StyledAnimated = {
  View      : styled(Animated.View, {autoFlattens: true}),
  Text      : styled(Animated.Text, {autoFlattens: true}),
  ScrollView: styled(Animated.ScrollView, {autoFlattens: true}),
  Image     : styled(Animated.Image, {autoFlattens: true}),
};

export default StyledAnimated;
