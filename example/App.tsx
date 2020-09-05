import React, {Profiler, useCallback, useEffect, useState}                             from "react";
import {media, StyledText, StyledView, ThemeFor, ThemeProvider, useComposedValues, vw} from "style-composer";
import {CheckBox, ScrollView}                                                          from "react-native";

import Card                    from "../example/src/components/Card/Card";
import {$Card, $ChildRuleTest} from "../example/src/components/Card/Card.style";
import Container               from "./src/components/Container/Container";
import Text         from "./src/components/Text/Text";
import Button       from "./src/components/Button/Button";
import {$BigMargin} from "./src/components/Button/Button.style";
import {THEMING}    from "./src/ThemeConsts";
import {$Heading}   from "./src/components/Text/Text.style";

const LIGHT_THEME: ThemeFor<typeof THEMING> = {};
const DARK_THEME: ThemeFor<typeof THEMING>  = {
  textColor      : "rgba(255,255,255,0.98)",
  backgroundColor: "#333",
};


interface AppInternalProps {
  onProfilePress: () => void;
}

const Title = () => {
  const {width}                       = useComposedValues(() => ({
    width                   : vw() + "px",
    [media({maxWidth: 800})]: {
      width: "small",
    },
    [media({maxWidth: 500})]: {
      width: "smaller",
    },
  }), []);

  return         <StyledText tag={"h2"} classes={$Heading.h2}>Page width: {width}</StyledText>;
};

const App = React.memo((props: AppInternalProps) => {
  const {onProfilePress} = props;

  const [themeToggle, setThemeToggle] = useState(false);


  return (
    <ThemeProvider plan={THEMING} value={themeToggle ? DARK_THEME : LIGHT_THEME}>
      <Container>
        <Title/>
        <Button title={"Profile"} onPress={onProfilePress}/>
        <CheckBox value={themeToggle} onChange={() => setThemeToggle(theme => !theme)}/>
        <ScrollView style={{maxHeight: 500}}>
          {Array(12).fill(0).map((_, index) => <Card key={index} classes={[$Card.xl]}
                                                     style={{borderRadius: 5, margin: 5}}>
            <Text>hello</Text>
          </Card>)}
        </ScrollView>
        <Card classes={$ChildRuleTest}>
          <Text>asda</Text>
        </Card>
        <Button title={"hi"} disabled={true} style={{backgroundColor: "red"}} classes={[$BigMargin]} onPress={() => {
          console.log("hi");
        }}/>
        <Text>Open up App.tsx to start working on your app!</Text>
      </Container>
    </ThemeProvider>
  );
});

export default App;
