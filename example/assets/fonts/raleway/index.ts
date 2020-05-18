import {createFontFamily} from "style-composer";

const Raleway = createFontFamily("Raleway", {
  black:            require("./Raleway-Black.ttf"),
  blackItalic:      require("./Raleway-BlackItalic.ttf"),
  bold:             require("./Raleway-Bold.ttf"),
  boldItalic:       require("./Raleway-BoldItalic.ttf"),
  extraBold:        require("./Raleway-ExtraBold.ttf"),
  extraBoldItalic:  require("./Raleway-ExtraBoldItalic.ttf"),
  extraLight:       require("./Raleway-ExtraLight.ttf"),
  extraLightItalic: require("./Raleway-ExtraLightItalic.ttf"),
  light:            require("./Raleway-Light.ttf"),
  lightItalic:      require("./Raleway-LightItalic.ttf"),
  medium:           require("./Raleway-Medium.ttf"),
  mediumItalic:     require("./Raleway-MediumItalic.ttf"),
  regular:          require("./Raleway-Regular.ttf"),
  regularItalic:    require("./Raleway-Italic.ttf"),
  semiBold:         require("./Raleway-SemiBold.ttf"),
  semiBoldItalic:   require("./Raleway-SemiBoldItalic.ttf"),
  thin:             require("./Raleway-Thin.ttf"),
  thinItalic:       require("./Raleway-ThinItalic.ttf")
});

export default Raleway;