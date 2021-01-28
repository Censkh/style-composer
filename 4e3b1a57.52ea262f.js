(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{76:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(3),a=n(7),o=(n(0),n(91)),i={id:"dynamic-units",title:"Dynamic Units"},c={unversionedId:"dynamic-units",id:"dynamic-units",isDocsHomePage:!1,title:"Dynamic Units",description:"Dynamic units allows you to use styles that will be updated automatically.",source:"@site/docs/dynamic-units.md",slug:"/dynamic-units",permalink:"/style-composer/dynamic-units",editUrl:"https://github.com/censkh/style-composer/edit/master/website/docs/dynamic-units.md",version:"current",sidebar:"someSidebar",previous:{title:"Pseudo Classes",permalink:"/style-composer/pseudo-classes"},next:{title:"Theming",permalink:"/style-composer/theming"}},s=[{value:"vh and vw",id:"vh-and-vw",children:[]}],l={toc:s};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.a)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.a)("p",null,"Dynamic units ",Object(o.a)("strong",{parentName:"p"},"allows you to use styles that will be updated automatically"),"."),Object(o.a)("h2",{id:"vh-and-vw"},"vh and vw"),Object(o.a)("p",null,"The equivalent of CSS's vw and vh that will keep in sync with the window's size."),Object(o.a)("p",null,"For example:"),Object(o.a)("pre",null,Object(o.a)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"{4,5}","{4,5}":!0}),'import {vw, vh} from "style-composer";\n\nexport const $Card = composeClass(() => ({\n    width: vw(25),\n    height: vh(25),\n\n    maxWidth: 300,\n    maxHeight: 300\n}));\n')))}u.isMDXComponent=!0},91:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=u(n),d=r,y=m["".concat(i,".").concat(d)]||m[d]||p[d]||o;return n?a.a.createElement(y,c(c({ref:t},l),{},{components:n})):a.a.createElement(y,c({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);