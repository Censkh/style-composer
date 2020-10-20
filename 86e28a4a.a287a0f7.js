(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{69:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(6),o=(n(0),n(78)),l={id:"fonts",title:"\ud83d\udea7 Fonts"},c={unversionedId:"fonts",id:"fonts",isDocsHomePage:!1,title:"\ud83d\udea7 Fonts",description:"This API is experimental and subject to change",source:"@site/docs\\fonts.md",slug:"/fonts",permalink:"/style-composer/fonts",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/fonts.md",version:"current",sidebar:"someSidebar",previous:{title:"Server Side Rendering",permalink:"/style-composer/ssr"},next:{title:"useComposedStyle()",permalink:"/style-composer/use-composed-style"}},i=[{value:"File Formats",id:"file-formats",children:[]},{value:"Web Fallbacks",id:"web-fallbacks",children:[]}],s={rightToc:i};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("div",{className:"admonition admonition-danger alert alert--danger"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})))),"danger")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"This API is experimental and subject to change"))),Object(o.b)("p",null,"You can dynamically load fonts in your app. First create your font family object:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="assets/fonts/raleway/index.js"',title:'"assets/fonts/raleway/index.js"'}),'import {createFontFamily} from "style-composer";\n\nconst raleway = createFontFamily("Raleway", {\n  bold            : require("./Raleway-Bold.ttf"),\n  boldItalic      : require("./Raleway-BoldItalic.ttf"),\n  regular         : require("./Raleway-Regular.ttf"),\n  regularItalic   : require("./Raleway-Italic.ttf"),\n});\n\nexport default raleway;\n')),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/Censkh/style-composer/blob/master/example/assets/fonts/raleway/index.ts"}),"Example font")),Object(o.b)("p",null,"Then use it in your styles (fonts are cascaded as you expect):"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="app-container.js"',title:'"app-container.js"'}),'export const $AppContainer = composeClass("app-container", () => ({\n    fontFamily: raleway(),\n}));\n')),Object(o.b)("p",null,"This also supports cascading that font family child elements further in the tree."),Object(o.b)("p",null,"Fonts created using this method can now interact with the ",Object(o.b)("inlineCode",{parentName:"p"},"fontWeight")," style as well to dynamically load different weights of your font:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'const $Bold = composeClass("bold", () => ({\n    fontWeight: "700",\n    // fontWeight: "bold"\n}));\n\n<StyledView classes={$Bold}>\n    <StyledText>I am going to be brave and bold!</StyledText>\n</StyledView>\n')),Object(o.b)("h2",{id:"file-formats"},"File Formats"),Object(o.b)("p",null,"You can provide multiple formats so when rendering on web it can pick the best format for the browser:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'export const openSans = createFontFamily("Open Sans", {\n      bold            : require("./Raleway-Bold.ttf"),\n      regular         : {\n        ttf:    require("./Raleway-Regular.ttf"),\n        eof:    require("./Raleway-Regular.eof"),\n        woff2:  require("./Raleway-Regular.woff2"),\n      }\n});\n')),Object(o.b)("h2",{id:"web-fallbacks"},"Web Fallbacks"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'export const openSans = createFontFamily("Open Sans", {\n    //...\n}, {\n    fallbacks: ["sans-serif"]\n});\n')))}p.isMDXComponent=!0},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),b=p(n),d=a,m=b["".concat(l,".").concat(d)]||b[d]||u[d]||o;return n?r.a.createElement(m,c(c({ref:t},s),{},{components:n})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var s=2;s<o;s++)l[s]=n[s];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);