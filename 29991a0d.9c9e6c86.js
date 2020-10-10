(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{61:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return l}));var r=n(2),o=n(6),a=(n(0),n(79)),i={id:"ssr",title:"Server Side Rendering"},s={unversionedId:"ssr",id:"ssr",isDocsHomePage:!1,title:"Server Side Rendering",description:"Style composer has support for server side rendering frameworks such as NextJS. When rendering on the server any elements that would usually be added to the head of the page are instead collected and kept as React elements that you can instead access via StyleEvironment.getServerSideHeadElements().",source:"@site/docs\\ssr.md",slug:"/ssr",permalink:"/style-composer/docs/ssr",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/ssr.md",version:"current",sidebar:"someSidebar",previous:{title:"Web Support",permalink:"/style-composer/docs/web-support"},next:{title:"useComposedStyle()",permalink:"/style-composer/docs/use-composed-style"}},p=[{value:"Screen Size Emulation",id:"screen-size-emulation",children:[]},{value:"NextJs Example",id:"nextjs-example",children:[]}],c={rightToc:p};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Style composer has support for server side rendering frameworks such as NextJS. When rendering on the server any elements that would usually be added to the head of the page are instead collected and kept as React elements that you can instead access via ",Object(a.b)("inlineCode",{parentName:"p"},"StyleEvironment.getServerSideHeadElements()"),"."),Object(a.b)("h2",{id:"screen-size-emulation"},"Screen Size Emulation"),Object(a.b)("p",null,"Usually device type can be inferred from the user agent of a request. When it can you can pass this device type to ",Object(a.b)("inlineCode",{parentName:"p"},"StyleEnvironment.setDeviceType()")," in order to emulate an appropriate screen size on the server. By default ",Object(a.b)("inlineCode",{parentName:"p"},'"desktop"')," is used."),Object(a.b)("p",null,"Supported device types:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},'"mobile"')," (600x1200)"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},'"desktop"')," (1920x1080)")),Object(a.b)("h2",{id:"nextjs-example"},"NextJs Example"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="next.config.js"',title:'"next.config.js"'}),'const {withExpo} = require("@expo/next-adapter");\n\nmodule.exports = withExpo({});\n')),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx",metastring:'title="pages/_app.tsx"',title:'"pages/_app.tsx"'}),'import React                  from "react";\nimport {AppContext, AppProps} from "next/app";\nimport Head                   from "next/head";\nimport {StyleEnvironment}     from "style-composer";\n\nconst NextApp = ({Component, pageProps}: AppProps) => {\n  return <>\n    <Head>\n      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n    </Head>\n    <Component {...pageProps} />\n  </>;\n};\n\nNextApp.getInitialProps = async (props: AppContext) => {\n  const isMobileView = (props.ctx.req\n    ? props.ctx.req.headers["user-agent"]\n    : (typeof navigator !== "undefined" && navigator.userAgent) || "")?.match(\n    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Mobile Safari|IEMobile|WPDesktop/i,\n  );\n\n  StyleEnvironment.setDeviceType(Boolean(isMobileView) ? "mobile" : "desktop");\n  return {};\n};\n\nexport default NextApp;\n')),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx",metastring:'title="pages/_document.tsx"',title:'"pages/_document.tsx"'}),'import Document, {Head, Html, Main, NextScript} from "next/document";\nimport React                                    from "react";\nimport {StyleEnvironment}                       from "style-composer";\nimport {getInitialProps}                        from "@expo/next-adapter/document";\n\nclass NextDocument extends Document {\n\n  render() {\n    return (\n      <Html lang={"en"} data-device-type={StyleEnvironment.getDeviceType()}>\n        <Head>\n          <meta charSet="UTF-8"/>\n          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>\n          {StyleEnvironment.getServerSideHeadElements()}\n        </Head>\n        <body>\n            <Main/>\n            <NextScript/>\n        </body>\n      </Html>\n    );\n  }\n}\n\nNextDocument.getInitialProps = getInitialProps;\n\nexport default NextDocument;\n')))}l.isMDXComponent=!0},79:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),l=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=l(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=l(n),m=r,b=d["".concat(i,".").concat(m)]||d[m]||u[m]||a;return n?o.a.createElement(b,s(s({ref:t},c),{},{components:n})):o.a.createElement(b,s({ref:t},c))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);