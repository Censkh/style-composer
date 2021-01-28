(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{68:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return p}));var n=a(2),r=a(6),o=(a(0),a(78)),l={id:"usage",title:"Usage",slug:"/"},c={unversionedId:"usage",id:"usage",isDocsHomePage:!1,title:"Usage",description:"The inbuilt styling system for React Native isn't powerful enough to allow for universal styling without the need to add component level logic to adapt to platform or screen size changes.",source:"@site/docs\\usage.md",slug:"/",permalink:"/style-composer/",editUrl:"https://github.com/censkh/style-composer/edit/master/website/docs/usage.md",version:"current",sidebar:"someSidebar",next:{title:"Cascading",permalink:"/style-composer/cascading"}},s=[{value:"Styling",id:"styling",children:[]},{value:"Built-in Components",id:"built-in-components",children:[]},{value:"Creating your own",id:"creating-your-own",children:[]}],i={rightToc:s};function p(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},i,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The inbuilt styling system for React Native isn't powerful enough to allow for universal styling without the need to add component level logic to adapt to platform or screen size changes."),Object(o.b)("p",null,"For example, currently with RN's inbuilt StyleSheets it is not possible to have media queries or themes without component logic."),Object(o.b)("p",null,"To solve this style-composer builds on-top of this system to provide many features it can't."),Object(o.b)("h2",{id:"styling"},"Styling"),Object(o.b)("p",null,"In a styling file you define your classes, which hold 'scopes' of style rules that can be applied to components:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="Card.style.js"',title:'"Card.style.js"'}),'import {composeClass} from "style-composer";\n\n// the function passed to compose class **must** be pure\nexport const $Card = composeClass("card", () => ({\n    fontSize: 14,\n    color: "#333",\n}));\n')),Object(o.b)("p",null,"Classes can be added to styled components easily using the ",Object(o.b)("inlineCode",{parentName:"p"},"classes")," prop which accepts either one class or a deep list of them. Rules in your classes also ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"cascading"}),"cascade")," meaning that some color and font will trickle down to child components. They lso interact with the ",Object(o.b)("inlineCode",{parentName:"p"},"style")," prop just as you would think:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),'import {$Card} from ".../Card.style";\n\n<StyledView classes={$Card}/>\n\n<StyledView classes={$Card} style={{backgroundColor: "red"}}/>\n\n<StyledView classes={[$Card, [$HeaderCard, $MainHeaderCard]]}/>\n\n<StyledView classes={[$Card, big && $BigMargin]}/>\n')),Object(o.b)("p",null,"You can construct new components that can have new classes passed to them as well as having thier own default ones:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="Card.js"',title:'"Card.js"'}),'import {StyledView, StyledText} from "style-composer";\nimport {$Card} from "./Card.style";\n\nexport function Card(props) {\n    const {classes, ...otherProps} = props;\n    return <StyledView classes={[$Card, classes]} {...otherProps}>\n        <StyledText>hi</StyledText>\n    </StyledView>;\n}\n')),Object(o.b)("p",null,"With typescript you can easily define new styled prop types:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),'import {StyledViewProps} from "style-composer";\n\nexport interface CardProps extends StyledViewProps {\n}\n')),Object(o.b)("h2",{id:"built-in-components"},"Built-in Components"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/view"}),"StyledView")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/safeareaview"}),"StyledSafeAreaView")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/text"}),"StyledText")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/textinput"}),"StyledTextInput")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/button"}),"StyledButton")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/touchablenativefeedback"}),"StyledTouchableNativeFeedback")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/touchableopacity"}),"StyledTouchableOpacity")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/touchablewithoutfeedback"}),"StyledTouchableWithoutFeedback")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/touchablehighlight"}),"StyledTouchableHighlight")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/scrollview"}),"StyledScrollView")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/image"}),"StyledImage")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/pressable"}),"StyledPressable")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactnative.dev/docs/animated"}),"StyledAnimated"))),Object(o.b)("h2",{id:"creating-your-own"},"Creating your own"),Object(o.b)("p",null,"You can wrap any component that takes a style prop with a ",Object(o.b)("inlineCode",{parentName:"p"},"styled()")," call to created a Styled version of it that accepts classes and styles. For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),'import {styled} from "style-composer";\n\nexport const StyledLink = styled(Link);\n')),Object(o.b)("p",null,"By default all styled components will flatten the styles before they are passed to the base component. If that component is designed for RN and already flattens styles you can optimize the component by skipping the extra flatten when passing ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlattens: true")," as an option:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"export const StyledCard = styled(Card, {autoFlattens: true});\n")))}p.isMDXComponent=!0},78:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=r.a.createContext({}),p=function(e){var t=r.a.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},b=function(e){var t=p(e.components);return r.a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),b=p(a),u=n,m=b["".concat(l,".").concat(u)]||b[u]||d[u]||o;return a?r.a.createElement(m,c(c({ref:t},i),{},{components:a})):r.a.createElement(m,c({ref:t},i))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var i=2;i<o;i++)l[i]=a[i];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"}}]);