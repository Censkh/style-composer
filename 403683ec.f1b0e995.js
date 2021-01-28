(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{63:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var a=n(2),r=n(6),c=(n(0),n(78)),o={id:"cascading",title:"Cascading"},s={unversionedId:"cascading",id:"cascading",isDocsHomePage:!1,title:"Cascading",description:"One of the features that React Native's built-in style system is missing is a good way to cascade down styles the same way you can in CSS. Style Composer allows you to cascade any selector that cascades in CSS.",source:"@site/docs\\cascading.md",slug:"/cascading",permalink:"/style-composer/cascading",editUrl:"https://github.com/censkh/style-composer/edit/master/website/docs/cascading.md",version:"current",sidebar:"someSidebar",previous:{title:"Usage",permalink:"/style-composer/"},next:{title:"Variants",permalink:"/style-composer/variants"}},i=[{value:"Getting cascading values",id:"getting-cascading-values",children:[]}],l={rightToc:i};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"One of the features that React Native's built-in style system is missing is a good way to cascade down styles the same way you can in CSS. Style Composer ",Object(c.b)("strong",{parentName:"p"},"allows you to cascade any selector that cascades in CSS.")),Object(c.b)("p",null,"Here are the current selectors that will cascade downards:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"fontSize"),Object(c.b)("li",{parentName:"ul"},"fontFamily"),Object(c.b)("li",{parentName:"ul"},"fontWeight"),Object(c.b)("li",{parentName:"ul"},"color"),Object(c.b)("li",{parentName:"ul"},"letterSpacing"),Object(c.b)("li",{parentName:"ul"},"textAlign")),Object(c.b)("h2",{id:"getting-cascading-values"},"Getting cascading values"),Object(c.b)("p",null,"You can access the current cascading styles using the ",Object(c.b)("inlineCode",{parentName:"p"},"CascadingValuesContext"),". Here is an example where the default color of an icon is pulled from the cascading styles:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'import {CascadingValuesContext} from "style-composer";\n\nexport const Icon = (props: IconProps) => {\n    const cascadingValues = useContext(CascadingValuesContext);\n    const cascadingStyle = cascadingValues.style;\n\n    const color = props.color || cascadingStyle.color;\n    return <Svg style={[{color}, props.style]}>\n        ...\n    </Svg>\n};\n')))}u.isMDXComponent=!0},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),p=u(n),b=a,m=p["".concat(o,".").concat(b)]||p[b]||d[b]||c;return n?r.a.createElement(m,s(s({ref:t},l),{},{components:n})):r.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,o=new Array(c);o[0]=b;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<c;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);