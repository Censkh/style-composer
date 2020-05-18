import React, {useState} from "react";
import Card              from "../example/src/components/Card/Card";
import {$Card}           from "../example/src/components/Card/Card.style";

import Container                 from "./src/components/Container/Container";
import {CheckBox, View}          from "react-native";
import Text                      from "./src/components/Text/Text";
import Button                    from "./src/components/Button/Button";
import {$BigMargin}              from "./src/components/Button/Button.style";
import {ThemeFor, ThemeProvider} from "style-composer";
import {THEMING}                 from "./src/ThemeConsts";
import {$Heading}                from "./src/components/Text/Text.style";

const LIGHT_THEME: ThemeFor<typeof THEMING> = {};
const DARK_THEME: ThemeFor<typeof THEMING> = {
  textColor      : "rgba(255,255,255,0.98)",
  backgroundColor: "#333",
};

export default function App() {
  const [themeToggle, setThemeToggle] = useState(false);
  return (
    <ThemeProvider plan={THEMING} value={themeToggle ? DARK_THEME : LIGHT_THEME}>
      <Container>
        <Text classes={$Heading.h2}>Test heading</Text>
        <CheckBox value={themeToggle} onChange={() => setThemeToggle(theme => !theme)}/>
        <Card classes={[$Card.xl]} style={{borderRadius: 5}}>
          <View>
            <Text>hello</Text>
          </View>
        </Card>
        <Button title={"hi"} classes={[$BigMargin]} onPress={() => {
        }}/>
        <Text>Open up App.tsx to start working on your app!</Text>
      </Container>
    </ThemeProvider>
  );
}

