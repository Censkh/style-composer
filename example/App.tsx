import React, {useState} from "react";
import Card              from "../example/src/components/Card/Card";
import {$Card}           from "../example/src/components/Card/Card.style";

import Container                                               from "./src/components/Container/Container";
import {CheckBox, ScrollView, View}                            from "react-native";
import Text                                                    from "./src/components/Text/Text";
import Button                                                  from "./src/components/Button/Button";
import {$BigMargin}                                            from "./src/components/Button/Button.style";
import {ThemeFor, ThemeProvider, useComposedValues, vw, media, StyledView, StyledText} from "style-composer";
import {THEMING}                                               from "./src/ThemeConsts";
import {$Heading}                                              from "./src/components/Text/Text.style";

const LIGHT_THEME: ThemeFor<typeof THEMING> = {};
const DARK_THEME: ThemeFor<typeof THEMING> = {
  textColor      : "rgba(255,255,255,0.98)",
  backgroundColor: "#333",
};

export default function App() {
  const [themeToggle, setThemeToggle] = useState(false);
  const {width} = useComposedValues(() => ({
    width: vw() + "px",
    [media({maxWidth: 800})]: {
      width: "small"
    },
    [media({maxWidth: 500})]: {
      width: "smaller"
    }
  }), []);

  return (
    <ThemeProvider plan={THEMING} value={themeToggle ? DARK_THEME : LIGHT_THEME}>
      <Container>
        <StyledText tag={"h2"} classes={$Heading.h2}>Page width: {width}</StyledText>
        <CheckBox value={themeToggle} onChange={() => setThemeToggle(theme => !theme)}/>
        <StyledView tag={"form"}>
          <Text>hi</Text>
        </StyledView>
        <ScrollView style={{maxHeight: 500}}>
          {Array(12).fill(0).map((_, index) => <Card key={index} classes={[$Card.xl]} style={{borderRadius: 5, margin: 5}}>
              <Text>hello</Text>
          </Card>)}
        </ScrollView>
        <Button title={"hi"} classes={[$BigMargin]} onPress={() => {
          console.log("hi")
        }}/>
        <Text>Open up App.tsx to start working on your app!</Text>
      </Container>
    </ThemeProvider>
  );
}

