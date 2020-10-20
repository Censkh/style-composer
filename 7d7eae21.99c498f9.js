(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{67:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),o=(n(0),n(78)),l={id:"style-selectors",title:"Style Selectors & Media Queries"},c={unversionedId:"style-selectors",id:"style-selectors",isDocsHomePage:!1,title:"Style Selectors & Media Queries",description:"Style selectors are selectors which allow you to add dynamic styling to your components..",source:"@site/docs\\style-selectors.md",slug:"/style-selectors",permalink:"/style-composer/style-selectors",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/style-selectors.md",version:"current",sidebar:"someSidebar",previous:{title:"Rule Order & Important",permalink:"/style-composer/rule-order-and-important"},next:{title:"Child Selector",permalink:"/style-composer/child-selector"}},i=[{value:"Built-in Selectors",id:"built-in-selectors",children:[]},{value:"Selector Boolean Logic",id:"selector-boolean-logic",children:[]}],s={rightToc:i};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Style selectors are selectors which ",Object(o.b)("strong",{parentName:"p"},"allow you to add dynamic styling to your components."),"."),Object(o.b)("p",null,"All ",Object(o.b)("strong",{parentName:"p"},"selectors will update automatically")," and require no further component logic."),Object(o.b)("p",null,"They are used in your class style and are defined in this pattern:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"{3,4,5}","{3,4,5}":!0}),'const $Style = composeClass("style", () => ({\n\n    [selector(options)]: {\n        ...optionalStyling\n    }\n\n}));\n')),Object(o.b)("p",null,"For example, if you wanted to change a component's ",Object(o.b)("inlineCode",{parentName:"p"},"fontSize")," depending on the screen dimensions you could use the ",Object(o.b)("inlineCode",{parentName:"p"},"media()")," selector:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),'function Card() {\n    const $Card = composeClass("card", () => ({\n        fontSize: 24,\n        color: "white",\n\n        [media({maxWidth: 1280})]: {\n            fontSize: 14\n        }\n    }));\n\n    return <StyledView classes={$Card}>\n        <StyledText>I am text!</StyledText>\n    </StyledView>\n}\n')),Object(o.b)("p",null,"This will make sure when the screen was smaller than 1280px the text inside the view would become smaller."),Object(o.b)("h2",{id:"built-in-selectors"},"Built-in Selectors"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Usage"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"media"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"media({maxWidth: 200})"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"rtl"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"rtl()"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"platform"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},'platform("web")')," or ",Object(o.b)("inlineCode",{parentName:"td"},'platform(["web", "android"])'))))),Object(o.b)("h2",{id:"selector-boolean-logic"},"Selector Boolean Logic"),Object(o.b)("p",null,"Style composer supplies methods to use boolean logic with selectors. For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),'export const pixel3 = () => and(\n  platform("android"),\n  media({maxWidth: 412}),\n  media({minWidth: 410}),\n);\n\nexport const $Card = composeClass("card", () => ({\n    margin: 5,\n\n    [pixel3()]: {\n        marginTop: 22\n    }\n}));\n')),Object(o.b)("p",null,"You can use ",Object(o.b)("inlineCode",{parentName:"p"},"and"),", ",Object(o.b)("inlineCode",{parentName:"p"},"or")," and ",Object(o.b)("inlineCode",{parentName:"p"},"not"),"."))}b.isMDXComponent=!0},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),b=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=b(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=b(n),u=r,m=p["".concat(l,".").concat(u)]||p[u]||d[u]||o;return n?a.a.createElement(m,c(c({ref:t},s),{},{components:n})):a.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=u;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var s=2;s<o;s++)l[s]=n[s];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);