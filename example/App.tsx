import React, {Profiler, useCallback, useEffect, useState}                             from "react";
import {media, StyledText, StyledView, ThemeFor, ThemeProvider, useComposedValues, vw} from "style-composer";
import {CheckBox, ScrollView}                                                          from "react-native";

import Card         from "../example/src/components/Card/Card";
import {$Card}      from "../example/src/components/Card/Card.style";
import Container    from "./src/components/Container/Container";
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

const AppInternal = React.memo((props: AppInternalProps) => {
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
        <Button title={"hi"} disabled={true} style={{backgroundColor: "red"}} classes={[$BigMargin]} onPress={() => {
          console.log("hi");
        }}/>
        <Text>Open up App.tsx to start working on your app!</Text>
      </Container>
    </ThemeProvider>
  );
});

export default function App() {
  const handleRender = useCallback((id, // the "id" prop of the Profiler tree that has just committed
                                    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
                                    actualDuration, // time spent rendering the committed update
                                    baseDuration, // estimated time to render the entire subtree without memoization
                                    startTime, // when React began rendering this update
                                    commitTime, // when React committed this update
                                    interactions, // the Set of interactions belonging to this update
  ) => {
    console.log(actualDuration, interactions);
  }, []);

  const [key, setState] = useState(0);

  const handleProfile = useCallback(() => {
    let times = 0;
    setInterval(() => {
      if (times < 100) {
        times++;
        console.log("Re-render " + times);
        setState(i => i + 1);
      }
    }, 100);
  }, []);

  return <Profiler id={"app"} onRender={handleRender}>
    <AppInternal onProfilePress={handleProfile}/>
  </Profiler>;
}
