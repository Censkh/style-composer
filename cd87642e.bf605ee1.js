(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{72:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),o=(n(0),n(79)),c={id:"web-support",title:"Web Support"},i={unversionedId:"web-support",id:"web-support",isDocsHomePage:!1,title:"Web Support",description:"Change DOM tags",source:"@site/docs\\web-support.md",slug:"/web-support",permalink:"/style-composer/docs/web-support",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/web-support.md",version:"current",sidebar:"someSidebar",previous:{title:"Theming",permalink:"/style-composer/docs/theming"},next:{title:"Server Side Rendering",permalink:"/style-composer/docs/ssr"}},s=[{value:"Change DOM tags",id:"change-dom-tags",children:[{value:"Supported components",id:"supported-components",children:[]}]}],l={rightToc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"change-dom-tags"},"Change DOM tags"),Object(o.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(o.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"This feature may break with future versions of React Native Web"))),Object(o.b)("p",null,"Some of the styled components support an extra ",Object(o.b)("inlineCode",{parentName:"p"},"tag")," prop which ",Object(o.b)("strong",{parentName:"p"},"allows you to change which DOM element they are rendered as on the web"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),'function Button({classes, children}) {\n    // NOTE: DO NOT define classes inside a component, this is merely for demonstration\n    const $Button = composeClass("button", () => ({\n        backgroundColor: "#673ab7",\n        color: "white",\n        padding: 10,\n        borderRadius: 30,\n        textAlign: "center",\n        width: 250,\n        cursor: "pointer",\n\n        [active()]:  {\n            backgroundColor: "#e91e63",\n        }\n    }));\n\n    const [isActive, setActive] = useState(false);\n\n    return <StyledPressable\n                tag={"button"}\n                classes={[$Button, classes]}\n                pseudoClasses={[isActive && active]}\n                onPressIn={() => setActive(true)}\n                onPressOut={() => setActive(false)}>\n        <StyledText>I am an actual button!</StyledText>\n    </StyledPressable>;\n}\n')),Object(o.b)("h3",{id:"supported-components"},"Supported components"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"StyledView"),Object(o.b)("li",{parentName:"ul"},"StyledTouchableNativeFeedback"),Object(o.b)("li",{parentName:"ul"},"StyledTouchableOpacity"),Object(o.b)("li",{parentName:"ul"},"StyledTouchableWithoutFeedback"),Object(o.b)("li",{parentName:"ul"},"StyledTouchableHighlight"),Object(o.b)("li",{parentName:"ul"},"StyledText"),Object(o.b)("li",{parentName:"ul"},"StyledPressable")))}p.isMDXComponent=!0},79:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||b[d]||o;return n?a.a.createElement(m,i(i({ref:t},l),{},{components:n})):a.a.createElement(m,i({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var l=2;l<o;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);