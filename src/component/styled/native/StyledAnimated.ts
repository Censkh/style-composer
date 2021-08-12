import {AnimatedStyledComponent, styled} from "../StyledComponent";
import {Animated}                        from "react-native";
import {PropsOf}                         from "../../../Utils";

export const StyledAnimated = {
  View      : styled(Animated.View, {autoFlattens: true}) as AnimatedStyledComponent<PropsOf<typeof Animated.View>>,
  Text      : styled(Animated.Text, {autoFlattens: true}) as AnimatedStyledComponent<PropsOf<typeof Animated.Text>>,
  ScrollView: styled(Animated.ScrollView, {autoFlattens: true}) as AnimatedStyledComponent<PropsOf<typeof Animated.ScrollView>>,
  Image     : styled(Animated.Image, {autoFlattens: true}) as AnimatedStyledComponent<PropsOf<typeof Animated.Image>>,
};

export default StyledAnimated;
