(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{84:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return u}));var a=n(3),s=n(7),r=(n(0),n(91)),o={id:"pseudo-classes",title:"Pseudo Classes"},l={unversionedId:"pseudo-classes",id:"pseudo-classes",isDocsHomePage:!1,title:"Pseudo Classes",description:"Pseudo classes are styling flags that allow you to add optional styling to your classes. Each pseudo class is also a selector to select any element that has been given that pseudo class. For example, when a button is pressed.",source:"@site/docs/pseudo-classes.md",slug:"/pseudo-classes",permalink:"/style-composer/pseudo-classes",editUrl:"https://github.com/censkh/style-composer/edit/master/website/docs/pseudo-classes.md",version:"current",sidebar:"someSidebar",previous:{title:"Child Selector",permalink:"/style-composer/child-selector"},next:{title:"Dynamic Units",permalink:"/style-composer/dynamic-units"}},c=[{value:"In-built Selectors",id:"in-built-selectors",children:[]},{value:"Demo",id:"demo",children:[]},{value:"Creating your own",id:"creating-your-own",children:[]}],i={toc:c};function u(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(r.a)("wrapper",Object(a.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(r.a)("p",null,"Pseudo classes are styling flags that allow you to ",Object(r.a)("strong",{parentName:"p"},"add optional styling")," to your classes. ",Object(r.a)("strong",{parentName:"p"},"Each pseudo class is also a selector")," to select any element that has been given that pseudo class. For example, when a button is pressed."),Object(r.a)("p",null,"There are two parts to using pseudo classes:"),Object(r.a)("p",null,"First, you must apply pseudo classes when conditions you want to style based upon are met. ",Object(r.a)("strong",{parentName:"p"},"No pseduo classes are applied automatically.")),Object(r.a)("pre",null,Object(r.a)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"{6}","{6}":!0}),'import {disabled} from "style-composer";\n\nexport default function Form({isDisabled, children}) {\n    return <StyledView\n                classes={[$Form, $FieldGroup]}\n                pseudoClasses={[isDisabled && disabled]}\n            >\n        {children}\n    </StyledView>;\n}\n')),Object(r.a)("p",null,"Now, we can add styling that is only applied when ",Object(r.a)("inlineCode",{parentName:"p"},"isDisabled")," is truthy in a ",Object(r.a)("strong",{parentName:"p"},"generic way that can be re-used by multiple components"),":"),Object(r.a)("pre",null,Object(r.a)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:"{6,7,8}","{6,7,8}":!0}),'import {disabled} from "style-composer";\n\nexport const $FieldGroup = composeClass("field-group", () => ({\n    padding: 10,\n\n    [disabled()]: {\n        opacity: 0.5,\n    }\n}));\n')),Object(r.a)("h2",{id:"in-built-selectors"},"In-built Selectors"),Object(r.a)("ul",null,Object(r.a)("li",{parentName:"ul"},"active"),Object(r.a)("li",{parentName:"ul"},"disabled"),Object(r.a)("li",{parentName:"ul"},"focus"),Object(r.a)("li",{parentName:"ul"},"hover")),Object(r.a)("h2",{id:"demo"},"Demo"),Object(r.a)("pre",null,Object(r.a)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),'function Button({classes, children}) {\n    // NOTE: DO NOT define classes inside a component, this is merely for demonstration\n    const $Button = composeClass("button", () => ({\n        backgroundColor: "#673ab7",\n        color: "white",\n        padding: 10,\n        borderRadius: 30,\n        textAlign: "center",\n        width: 150,\n\n        [active()]:  {\n            backgroundColor: "#e91e63",\n        }\n    }));\n\n    const [isActive, setActive] = useState(false);\n\n    return <StyledTouchableOpacity\n                classes={[$Button, classes]}\n                pseudoClasses={[isActive && active]} // <-- adds active when isActive is true\n                activeOpacity={1}\n                onPressIn={() => setActive(true)}\n                onPressOut={() => setActive(false)}>\n        <StyledText>Press me!</StyledText>\n    </StyledTouchableOpacity>;\n}\n')),Object(r.a)("h2",{id:"creating-your-own"},"Creating your own"),Object(r.a)("p",null,"If you wished to add your own pseudo class selectors for your app you can do so like this:"),Object(r.a)("pre",null,Object(r.a)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'import {createPseudoSelector} from "style-composer";\n\nexport const selected = createPseudoSelector("selected");\n')),Object(r.a)("p",null,"This will now work just the same as the in-built pseudo classes"))}u.isMDXComponent=!0},91:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a=n(0),s=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var i=s.a.createContext({}),u=function(e){var t=s.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},d=s.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,b=d["".concat(o,".").concat(m)]||d[m]||p[m]||r;return n?s.a.createElement(b,l(l({ref:t},i),{},{components:n})):s.a.createElement(b,l({ref:t},i))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var i=2;i<r;i++)o[i]=n[i];return s.a.createElement.apply(null,o)}return s.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);