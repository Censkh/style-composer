(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{267:function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"CASCADING_STYLES",(function(){return W})),n.d(r,"computeClasses",(function(){return G})),n.d(r,"computeStyling",(function(){return J})),n.d(r,"removePropTypes",(function(){return q})),n.d(r,"sanitizeStyleObject",(function(){return Y})),n.d(r,"sanitizeStyleList",(function(){return Q})),n.d(r,"sanitizeStyleValue",(function(){return X})),n.d(r,"sanitizeStylingToStaticStyle",(function(){return Z})),n.d(r,"resolveStyling",(function(){return ee})),n.d(r,"isDynamicValue",(function(){return ne})),n.d(r,"extractCascadingStyle",(function(){return re})),n.d(r,"useComposedValues",(function(){return Ie})),n.d(r,"useComposedStyle",(function(){return Ce})),n.d(r,"CascadingValuesContext",(function(){return ce})),n.d(r,"CascadingValuesProvider",(function(){return ue})),n.d(r,"important",(function(){return M})),n.d(r,"StyleEnvironment",(function(){return he})),n.d(r,"styled",(function(){return Ue})),n.d(r,"StyledView",(function(){return Ke})),n.d(r,"StyledSafeAreaView",(function(){return qe})),n.d(r,"StyledText",(function(){return Ye})),n.d(r,"StyledTextInput",(function(){return Xe})),n.d(r,"StyledButton",(function(){return et})),n.d(r,"StyledTouchableNativeFeedback",(function(){return rt})),n.d(r,"StyledTouchableOpacity",(function(){return at})),n.d(r,"StyledTouchableWithoutFeedback",(function(){return st})),n.d(r,"StyledTouchableHighlight",(function(){return dt})),n.d(r,"StyledScrollView",(function(){return yt})),n.d(r,"StyledImage",(function(){return vt})),n.d(r,"StyledPressable",(function(){return St})),n.d(r,"StyledAnimated",(function(){return Ot})),n.d(r,"poly",(function(){return Re})),n.d(r,"PolyView",(function(){return Je})),n.d(r,"PolyTouchableNativeFeedback",(function(){return nt})),n.d(r,"PolyTouchableOpacity",(function(){return it})),n.d(r,"PolyTouchableWithoutFeedback",(function(){return ct})),n.d(r,"PolyTouchableHighlight",(function(){return ft})),n.d(r,"PolyText",(function(){return ze})),n.d(r,"PolyPressable",(function(){return gt})),n.d(r,"CssGlobalStyling",(function(){return _t})),n.d(r,"composeClass",(function(){return f})),n.d(r,"registerStyleSheets",(function(){return d})),n.d(r,"classesId",(function(){return p})),n.d(r,"flattenClasses",(function(){return y})),n.d(r,"getClassMeta",(function(){return h})),n.d(r,"createFontFamily",(function(){return Oe})),n.d(r,"createThemeSchema",(function(){return w})),n.d(r,"ThemeProvider",(function(){return _})),n.d(r,"useTheming",(function(){return j})),n.d(r,"createDynamicUnit",(function(){return g})),n.d(r,"vw",(function(){return jt})),n.d(r,"vh",(function(){return wt})),n.d(r,"media",(function(){return Ct})),n.d(r,"rtl",(function(){return Pt})),n.d(r,"platform",(function(){return It})),n.d(r,"createPseudoSelector",(function(){return Nt})),n.d(r,"active",(function(){return At})),n.d(r,"focus",(function(){return Tt})),n.d(r,"disabled",(function(){return xt})),n.d(r,"hover",(function(){return Et})),n.d(r,"child",(function(){return _e})),n.d(r,"and",(function(){return x})),n.d(r,"or",(function(){return T})),n.d(r,"not",(function(){return A})),n.d(r,"createStyleSelectorType",(function(){return L}));var o=n(0),i=n.n(o),a=n(83),u=n(80),c=n(92),s=new(function(){function e(){this.classes={},c.d()||(c.c().__classManager=this)}return e.prototype.registerClass=function(e){this.classes[e.__meta.className]=e},e.prototype.hasClass=function(e){return Boolean(this.classes[e])},e}()),l=0,f=function e(t,n,r){var o,i=null===(o=null==r?void 0:r.parent)||void 0===o?void 0:o.__meta.name,a=i?i+"("+t+")":t;s.hasClass(a)&&console.error("[style-composer] Re-declaring class '"+a+"', this will cause performance issues");var u={},c={__meta:{key:l++,name:t,parent:(null==r?void 0:r.parent)||null,className:a,variants:u,stylingBuilder:n}},f=c.__meta;return(null==r?void 0:r.variants)&&Object.keys(r.variants).forEach((function(t){var n=r.variants[t];u[t]=e(t,n,{parent:c})})),Object.assign(f,ee(a,f.stylingBuilder)),s.registerClass(c),Object.assign(c,u)},d=function e(t){var n,r,o;if(!t.sheetId)for(var i in t.sheetId=(n=t.className,r=t.staticStyle,u.a.create((o={},o[n]=r,o))[n]),t.scopes){e(t.scopes[i])}},p=function(e){if(!e)return null;if(Array.isArray(e)){var t=c.b(e).reduce((function(e,t){return t&&e.push(t.__meta.key.toString()),e}),[]);return 0===t.length?null:t.sort().join(",")}return e.__meta.key.toString()},y=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return c.b(e)},h=function(e){return e.__meta},v=-1/0,m={running:!1,called:!1},g=function(e,t){return Object.assign((function(e){return m.running?(m.called=!0,v):t(e)}),{key:e})},S={running:!1,called:!1},b={},O=i.a.createContext(b);function _(e){return i.a.createElement(O.Provider,e)}var j=function(){var e=Object(o.useContext)(O);return b=e,e};function w(e){for(var t={},n=function(n){var r=e[n],o=t[n]=Object.assign((function(){return S.called=!0,S.running?o:b[n]||r}),{key:n,defaultValue:r,toString:function(){return n}})},r=0,o=Object.keys(e);r<o.length;r++){n(o[r])}return t}var C=function(){return(C=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},k={id:1,registering:!1,running:!1,instances:{},resolution:void 0,session:void 0},P=function(e,t,n){k.id=1,k.registering=Boolean(e),k.session=n,k.running=!0,k.resolution=t,k.instances={}},F=function(){return k.registering=!1,k.running=!1,k.instances},I=function(e,t){var n=Math.max.apply(Math,e);return Object.assign(t?n:0,{__selectorResult:{resultId:n,ids:e}})},N=function(e){return 0!=e},A=function(e){return I(e.__selectorResult.ids,!N(e))},x=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=e.flatMap((function(e){return e.__selectorResult.ids}));if(k.registering){var r=I(n,!0);return k.instances[r.__selectorResult.resultId].compoundSelectors=r.__selectorResult.ids,r}return I(n,e.every(N))},T=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=e.flatMap((function(e){return e.__selectorResult.ids}));if(k.registering){var r=I(n,!0);return k.instances[r.__selectorResult.resultId].compoundSelectors=r.__selectorResult.ids,r}return I(n,e.some(N))},E={},B=function(e,t){var n=E[e.id];n||(n=E[e.id]=new Set),n.add(t)},V=function(e,t){var n=E[e.id];n&&n.delete(t)},R=0;function L(e,t,n){var r,o=Object.assign((function(e){if(!k.running)throw new Error("[style-composer] Do not call selector functions outside of a class definition");var t=k.id;if(k.id+=1,k.registering)return k.instances[t]={compoundSelectors:[],scope:null,id:t,key:R++,options:e||{},type:o,className:"__selector_"+t+o.id,sheetId:null},I([t],!0);var n=k.resolution.rootScope.selectors[t];return I([t],o.check(n,k.session))}),t||{},C(C({},n),{id:e}));return Object.defineProperty(o,"name",{value:e}),o.register&&o.register((r=o,function(){var e;null===(e=E[r.id])||void 0===e||e.forEach((function(e){return e()}))})),o}var z={running:!1,called:!1},H=function(e){return null!=e&&e.__important},M=function(e){return z.running?(z.called=!0,Object.assign(e,{__important:!0})):e},D=function(e,t){return function(e,t){return Object.assign(e,{optimise:t})}(e,(function(e){return Object(c.f)()?t(e):e}))},W=["fontSize","fontFamily","fontWeight","color","letterSpacing","textAlign"],U={};function G(e,t,n){var r;if(!e||0===e.length)return{classNames:[],style:t?[t]:[]};var o=n||U,i=[],a=[],u=[];if(null===(r=o.applicableChildSelectors)||void 0===r?void 0:r.length)for(var c=0,s=o.applicableChildSelectors;c<s.length;c++){var l=s[c];$(l.scope,a,u,i)}for(var f=0,d=e;f<d.length;f++){var p=d[f];p.__meta.parent&&K(!0,p.__meta.parent.__meta,o,a,u,i),K(!0,p.__meta,o,a,u,i)}return t&&a.push(t),u.length>0&&a.push.apply(a,u),{classNames:i,style:a}}var J=function(e){var t=[],n=[];return K(!1,e,{},n,t),Y(u.a.flatten([t,n]))},K=function(e,t,n,r,o,i){e&&d(t.rootScope);var a=t.rootScope,u=t.stylingBuilder;if(a.isSimple){var c=a.sheetId,s=a.staticStyle,l=a.className,f=a.staticImportantStyle;return i&&i.push(l),r.push(c||s),void(f&&o.push(f))}P(!1,t,n);var p=u();for(var y in F(),a.resolvedStyling=p,a.scopes){var h=p[y];h&&(a.scopes[y].resolvedStyling=h)}$(a,r,o,i),p[0]=void 0},$=function e(t,n,r,o){var i=t.sheetId,a=t.resolvedStyling,u=t.isSimple,c=t.className,s=t.staticStyle,l=t.staticImportantStyle,f=t.selectors,d=t.hasDynamicProps,p=t.hasImportant,y=t.hasSelectors,h=t.importantProps,v=t.dynamicProps;if(o&&o.push(c),u)return n.push(i||s),void(l&&r.push(l));if(n.push(i||a),d&&n.push(function(e,t){for(var n={},r=0,o=t;r<o.length;r++){var i=o[r];n[i]=e[i]}return n}(a,v)),p){for(var m={},g=0,S=h;g<S.length;g++){var b=S[g];m[b]=a[b]}r.push(m)}if(y)for(var O=0,_=Object.values(f);O<_.length;O++){var j=_[O];if(a[j.id])e(t.scopes[j.id],n,r,o),delete a[j.id]}delete a[0]},q=function(e){0},Y=function(e,t){for(var n={},r=0,o=Object.keys(e);r<o.length;r++){var i=o[r],a=e[i];isNaN(i)&&(n[i]=X(a,t))}return n},Q=function(e,t){return e?c.b(e).map((function(e){return"object"==typeof e?Y(e,t):e})):e},X=function(e,t){if(null==e)return e;var n=e;return t&&function(e){return null!=e&&void 0!==e.optimise}(e)&&(n=e.optimise(e)),("number"==typeof e||e instanceof Number)&&(n=Number(e)),("string"==typeof e||e instanceof String)&&(n=String(e)),n},Z=function(e){var t=null;return{style:Object.keys(e).reduce((function(n,r){var o=e[r];if(isNaN(r)&&!ne(o)){var i=X(o);H(o)&&(t||(t={}),t[r]=i),n[r]=i}return n}),{}),importantStyle:t}},ee=function(e,t){m.called=!1,m.running=!0,S.called=!1,S.running=!0,P(!0),z.called=!1,z.running=!0;var n=t(),r=F(),o=(S.running=!1,S.called),i=(m.running=!1,m.called),a=(z.running=!1,z.called),u=Object.keys(r).length>0,c=Boolean(o||i);return{rootScope:te(0,e,n,r,o,c,a),stylingBuilder:t,hasAnySelectors:u,hasAnyDynamicProps:c,hasAnyImportant:a,hasAnyThemed:o}},te=function e(t,n,r,o,i,a,u){for(var c=[],s=[],l={},f={},d=0,p=Object.keys(r);d<p.length;d++){var y=p[d],h=r[y];if(a&&ne(h))c.push(y);else if(u&&H(h))s.push(y);else if("object"==typeof h&&!isNaN(y)){var v=Number(y),m=o[v];f[v]=m;for(var g=0,S=m.compoundSelectors;g<S.length;g++){var b=S[g];f[b]=o[b]}var O=l[v]=e(v,m.className,h,o,i,a,u);m.scope=O}}var _=Z(r),j=_.style,w=_.importantStyle,C=i,k=Object.keys(f).length>0,P=c.length>0,F=!k&&!P&&!C;return{id:t,className:n,sheetId:null,staticStyle:j,staticImportantStyle:w,dynamicProps:c,hasDynamicProps:C||P,importantProps:s,hasImportant:s.length>0,selectors:f,hasDynamicUnit:P,hasSelectors:k,hasThemed:C,scopes:l,isSimple:F,resolvedStyling:r}},ne=function(e){return"function"==typeof e||e===v||"string"==typeof e&&e.includes(v.toString())},re=function(e,t){if(!e||!t)return[null,""];var n=!1,r="",o=W.reduce((function(o,i){var a,u=e[i];return u?(n=!0,a=u):a=t[i],r+=a+"|",o[i]=a,o}),{});return n?[o,r]:[null,""]},oe=i.a.createContext({style:{},key:"",childSelectors:[]});Object.assign(oe,{displayName:"CascadingValues"});var ie,ae,ue=oe.Provider,ce=oe,se={ttf:"truetype",eot:"embedded-opentype",woff:"woff",woff2:"woff2"},le=((ie={})[100]="thin",ie[200]="extraLight",ie[300]="light",ie[400]="regular",ie[500]="medium",ie[600]="semiBold",ie[700]="bold",ie[800]="extraBold",ie[900]="black",ie),fe={thin:100,extraLight:200,light:300,regular:400,medium:500,semiBold:600,bold:700,extraBold:800,black:900},de=["black","blackItalic","bold","boldItalic","extraBold","extraBoldItalic","extraLight","extraLightItalic","light","lightItalic","medium","mediumItalic","regular","regularItalic","semiBold","semiBoldItalic","thin","thinItalic"],pe=n(98),ye={mobile:{width:600,height:1200,scale:1,fontScale:1},desktop:{width:1920,height:1080,scale:1,fontScale:1}},he=new(function(){function e(){this.serverSideHeadElements={},this.deviceType="desktop"}return e.prototype.setDeviceType=function(e){this.deviceType=e},e.prototype.getDeviceType=function(){return this.deviceType},e.prototype.getScreenSize=function(){return Object(c.e)()?ye[this.getDeviceType()]:pe.a.get("window")},e.prototype.getScreenWidth=function(){return this.getScreenSize().width},e.prototype.getScreenHeight=function(){return this.getScreenSize().height},e.prototype.addScreenSizeChangeListener=function(e){pe.a.addEventListener("change",e)},e.prototype.removeScreenSizeChangeListener=function(e){pe.a.removeEventListener("change",e)},e.prototype.updateHeadElement=function(e,t,n,r){var o;if(!Object(c.d)()){var a=Object.assign({},n,((o={})["data-sc-element-key"]=e,o.key=e,o));if(Object(c.e)()){var u=this.serverSideHeadElements[e];this.serverSideHeadElements[e]=u?i.a.cloneElement(u,a,r):i.a.createElement(t,a,r)}else{u=document.head.querySelector('[data-sc-element-key*="'+e+'"]');for(var s in u||(u=document.createElement(t),document.head.appendChild(u)),u.innerText=r||"",n)u.setAttribute(s,n[s])}}},e.prototype.getServerSideHeadElements=function(){return i.a.createElement(i.a.Fragment,{},Object.values(this.serverSideHeadElements))},e}()),ve=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r},me={},ge={},Se={},be=function(e){return"string"==typeof e?e:e&&"object"==typeof e&&"string"==typeof e.default?e.default:null},Oe=function(e,t,n){var r=Object.assign((function(){return r.regular()}),{weight:function(e){return e.endsWith("00")?r[le[parseInt(e)]]():r[e]()},options:n||{}});Object.defineProperty(r,"name",{value:e});for(var o=function(o){var i=e+"__"+o,a=ve([e],(null==n?void 0:n.fallbacks)||[]).join(",");r[o]=function(){if(!function(e){return Boolean(Se[e])}(i)){var n=t[o];if(n){var r=function(e){var t=[],n=be(e);if(n){var r=n.split("."),o=r[r.length-1];t.push({type:o,location:n})}else for(var i=0,a=["woff2","woff","ttf","eot"];i<a.length;i++){var u=a[i],c=be(e[u]);c&&t.push({type:u,location:c})}return t}(n),u="@font-face{font-family: '"+e+"';font-style: "+(o.includes("Italic")?"italic":"normal")+";font-display: swap;font-weight:"+fe[o]+";src: local('"+e+"'),"+r.map((function(e){return"url('"+e.location+"') format('"+se[e.type]+"')"})).join(",")+";}";he.updateHeadElement("font-family-style("+i+")","style",{"data-font-family":e,"data-font-weight":o},u),Se[i]=!0}}return a}},i=0,a=de;i<a.length;i++){o(a[i])}return me[e]=r,r},_e=L("child",{check:function(e,t){return!1},register:function(){}}),je=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r},we=function(){var e=Object(o.useState)(0),t=e[0],n=e[1];return[t,Object(o.useCallback)((function(){return n((function(e){return e+1}))}),[n])]},Ce=function(e,t){var n=e.classes,r=e.style,i=e.pseudoClasses,a=Object(o.useRef)([]),s=Object(o.useContext)(ce),l=s.style,f=s.key,d=s.childSelectors,p=we(),y=p[0],h=p[1],v=(Array.isArray(i)?c.b(i):i&&[i]||[]).map((function(e){return"string"==typeof e?e:e.type})),m={pseudoClasses:v||[],applicableChildSelectors:[]},g=ke(n,m),S=g.theme,b=g.key,O=g.classArray;m.applicableChildSelectors=O&&d&&d.filter((function(e){var t=c.a(e.options);return null==O?void 0:O.some((function(e){return t.includes(e)||t.find((function(t){var n;return t.__meta.className===(null===(n=e.__meta.parent)||void 0===n?void 0:n.__meta.className)}))}))}));var _=!(null==t?void 0:t.disableCascade),j=Object(o.useMemo)((function(){var e,t=G(O,r,m),n=t.style,o=u.a.flatten(n);if(null==o?void 0:o.fontWeight){var i=o.fontFamily||l.fontFamily;if(i){var s=(e=i.split(/(__|,)/g)[0],me[e]);if(s){var f=s.weight(null==o?void 0:o.fontWeight);f&&i!==f&&(o.fontFamily=f,n.push({fontFamily:f}))}}}var d=_?[l,n]:[n],p=u.a.flatten(d),y=re(o,l),v=y[0],g=y[1];if(c.d()&&p.fontFamily){var S=p.fontFamily;if(function(e){return Boolean(ge[e])}(S))if(function(e){return Boolean(Se[e])}(S))d.push({fontWeight:"normal"});else a.current.includes(S)||(a.current.push(S),function(){h()}),d.push({fontFamily:"System"})}var b=null==O?void 0:O.flatMap((function(e){return e.__meta.hasAnySelectors&&Object.values(e.__meta.rootScope.selectors).filter((function(e){return e.type.id===_e.id}))})).filter(Boolean),j=[g||"null",(null==b?void 0:b.map((function(e){return e.key})).join(","))||"null"].join("==="),w=Q(d,!0);return{classNames:t.classNames,sanitizedStyleList:w,computedStyleFlat:p,cascadingStyle:v,cascadingValuesKey:j,ownChildSelectors:b}}),[r,f,b,y,S]),w=j.sanitizedStyleList,C=j.cascadingStyle,k=j.cascadingValuesKey,P=j.classNames,F=j.ownChildSelectors,I=Boolean(C||F&&F.length>0),N=Object(o.useMemo)((function(){return I&&{style:C||l,key:k,childSelectors:F&&F.length>0?je(F,d):d}||null}),[k]),A=Object(o.useMemo)((function(){var e={};return{style:Object(c.d)()||(null==t?void 0:t.autoFlattens)?w:u.a.flatten(w),"data-class":e.class,"data-pseudo-class":e["pseudo-class"],dataSet:e}}),[w,null==t?void 0:t.autoFlattens,P,v]);return{computedStyle:w,cascadingContextValue:N,classNames:P,flatPseudoClasses:v,appliedClasses:O||[],computedProps:A}},ke=function(e,t){var n=Object(o.useRef)(Math.floor(1e8*Math.random()).toString()),r=Object(o.useMemo)((function(){var t=e&&y(e)||void 0,n=p(t),r=null==t?void 0:t.some((function(e){return e.__meta.hasAnyDynamicProps}));return{classArray:t,classId:n,hasDynamicUnit:r}}),[e]),i=r.classArray,a=r.classId,u=r.hasDynamicUnit,c=Pe(n.current,i,t,a),s=c[0],l=c[1],f=j();return Object(o.useEffect)((function(){if(u)return he.addScreenSizeChangeListener(l),function(){he.removeScreenSizeChangeListener(l)}}),[u]),{theme:f,key:s+"_"+a+"_"+(t.pseudoClasses?t.pseudoClasses.sort().join(","):""),classId:a,classArray:i,uid:n.current}},Pe=function(e,t,n,r){var i=we(),a=i[0],u=i[1],c=Object(o.useRef)(""),s=Object(o.useRef)();s.current=t;var l=Object(o.useCallback)((function(){var e="";if(s.current)for(var t=0,r=s.current;t<r.length;t++){for(var o=r[t],i=0,a=Object.values(o.__meta.rootScope.selectors);i<a.length;i++){var l=a[i];e+=l.type.check(l,n)?"1":"0"}e+="-"}c.current!==e&&(c.current=e,u())}),[]);return Object(o.useEffect)((function(){if(t&&t.some((function(e){return e.__meta.hasAnySelectors}))){for(var e=0,n=t;e<n.length;e++){var r=n[e];if(r.__meta.hasAnySelectors)for(var o=0,i=Object.keys(r.__meta.rootScope.selectors);o<i.length;o++){var a=i[o],u=r.__meta.rootScope.selectors[a];B(u.type,l)}}return function(){for(var e=0,n=t;e<n.length;e++){var r=n[e];if(r.__meta.hasAnySelectors)for(var o=0,i=Object.keys(r.__meta.rootScope.selectors);o<i.length;o++){var a=i[o],u=r.__meta.rootScope.selectors[a];V(u.type,l)}}}}}),[r,u]),[a,u]},Fe=0,Ie=function(e,t){var n=we(),r=n[0],i=n[1],a=Object(o.useRef)(""),u=Object(o.useRef)(),c=Object(o.useRef)((Fe++).toString()),s=Object(o.useMemo)((function(){return ee("__composed_"+c.current,e)}),t);u.current=s;var l=s.hasAnyDynamicProps,f=Object(o.useCallback)((function(){var e="";if(u.current)for(var t=0,n=Object.values(u.current.rootScope.selectors);t<n.length;t++){var r=n[t];e+=r.type.check(r,{})?"1":"0"}a.current!==e&&(a.current=e,i())}),[]);return Object(o.useEffect)((function(){if(l)return he.addScreenSizeChangeListener(i),function(){he.removeScreenSizeChangeListener(i)}}),[l]),Object(o.useEffect)((function(){if(s.hasAnySelectors){for(var e=0,t=Object.keys(s.rootScope.selectors);e<t.length;e++){var n=t[e],r=s.rootScope.selectors[n];B(r.type,f)}return function(){for(var e=0,t=Object.keys(s.rootScope.selectors);e<t.length;e++){var n=t[e],r=s.rootScope.selectors[n];V(r.type,f)}}}}),[s]),Object(o.useMemo)((function(){return J(s)}),[s,r])},Ne=n(116),Ae=n(81),xe=(ae=function(e,t){return(ae=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}ae(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),Te=function(){return(Te=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},Ee=["draggable"],Be=function(e,t){return e.tag?t.type===Ae.a?i.a.createElement(Le,t.props):Te(Te({},t),{props:Object.assign({},Object.keys(e).reduce((function(t,n){return Ee.includes(n)&&(t[n]=e[n]),t}),{}),t.props),type:e.tag}):t},Ve=!1,Re=function(e){if(!e)return e;if(c.d()||e.isPoly)return e;e.isPoly=!0;var t=e.prototype?function(e){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return xe(t,e),t.prototype.render=function(){if(Ve)return e.prototype.render.call(this);try{var t=e.prototype.render;return e.prototype.renderView?t=e.prototype.renderView:e.prototype.renderText&&(t=e.prototype.renderText),Be(this.props,t.call(this))}catch(n){return console.error("[style-composer] Poly component failed to render, bailing and returning all poly components to normal"),console.error(n),Ve=!0,e.prototype.render.call(this)}},t}(e)}(e):function(e){var t=e.render,n=void 0;return e.render=function(e,r){var o,i=t(e,r);return void 0===n&&(n=Boolean(null===(o=i.type.$$typeof)||void 0===o?void 0:o.toString().includes("react.provider"))),n?Te(Te({},i),{props:Te(Te({},i.props),{children:Be(e,i.props.children)})}):Be(e,i)},e}(e);return t.displayName="Poly["+e.displayName+"]",t},Le=Re(Ae.a),ze=Re(Ne.a),He=ze,Me=function(){return(Me=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},De=Object.assign((function(e){var t=e.children,n=e._baseComponent,r=e.ref,a=e.options,u=e.otherProps,c=Ce(e,Me({disableCascade:n!==Ne.a&&n!==He},a)),s=c.cascadingContextValue,l=c.computedProps,f=Object(o.useRef)(),d=Object(o.useCallback)((function(e){f.current=e,r&&("function"==typeof r?r(e):r.current=e)}),[r]);q(t);var p=i.a.createElement(n,Me(Me(Me({},u),l),{ref:d}),t);return s?i.a.createElement(ue,{value:s},p):p}),{displayName:"Styler"}),We=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},Ue=function(e,t){return e?i.a.memo(Object.assign(i.a.forwardRef((function(n,r){var o=n.children,i=n.style,a=n.pseudoClasses,u=n.classes,c=We(n,["children","style","pseudoClasses","classes"]);return De({classes:u,style:i,pseudoClasses:a,ref:r,_baseComponent:e,children:o,options:t,otherProps:c})})),{displayName:"Styler"+(e.displayName?"["+e.displayName+"]":"")}),Ge):e};function Ge(e,t){return Object(c.g)(e,t,{classes:function(e,t){return p(e)===p(t)}})}var Je=Re(Ae.a),Ke=Ue(Je,{autoFlattens:!0}),$e=n(172),qe=Ue($e.a,{autoFlattens:!0}),Ye=Ue(He,{autoFlattens:!0}),Qe=n(173),Xe=Ue(Qe.a,{autoFlattens:!0}),Ze=n(171),et=Ue(Ze.a,{autoFlattens:!0}),tt=n(175),nt=Re(tt.a),rt=Ue(nt,{autoFlattens:!0}),ot=n(133),it=Re(ot.a),at=Ue(it,{autoFlattens:!0}),ut=n(176),ct=Re(ut.a),st=Ue(ct,{autoFlattens:!0}),lt=n(174),ft=Re(lt.a),dt=Ue(ft,{autoFlattens:!0}),pt=n(103),yt=Ue(pt.a,{autoFlattens:!0}),ht=n(117),vt=Ue(ht.a,{autoFlattens:!0}),mt=n(179),gt=Re(mt.a),St=Ue(gt,{autoFlattens:!0}),bt=n(178),Ot={View:Ue(bt.a.View,{autoFlattens:!0}),Text:Ue(bt.a.Text,{autoFlattens:!0}),ScrollView:Ue(bt.a.ScrollView,{autoFlattens:!0}),Image:Ue(bt.a.Image,{autoFlattens:!0})},_t=function(e){var t=e.name,n=e.children;return he.updateHeadElement("css-global-styling("+t+")","style",{"data-style-sheet":t},n),null},jt=g("vw",(function(e){return D((void 0===e?100:e)/100*he.getScreenWidth(),(function(){return e+"vw"}))})),wt=g("vh",(function(e){return D((void 0===e?100:e)/100*he.getScreenHeight(),(function(){return e+"vh"}))})),Ct=L("media",{check:function(e){var t=e.options,n=Math.round(he.getScreenWidth()),r=Math.round(he.getScreenHeight());return!("number"==typeof t.maxWidth&&n>t.maxWidth)&&(!("number"==typeof t.minWidth&&n<t.minWidth)&&(!("number"==typeof t.maxHeight&&r>t.maxHeight)&&!("number"==typeof t.minHeight&&r<t.minHeight)))},register:function(e){he.addScreenSizeChangeListener(e)}}),kt=n(112),Pt=L("rtl",{check:function(){return kt.a.isRTL}}),Ft=n(101),It=L("platform",{check:function(e){var t=e.options;return Array.isArray(t)?t.includes(Ft.a.OS):t===Ft.a.OS},register:function(){}}),Nt=function(e){return L("pseudo",{check:function(t,n){var r;return Boolean(null===(r=null==n?void 0:n.pseudoClasses)||void 0===r?void 0:r.includes(e))}},{type:e})},At=Nt("active"),xt=Nt("disabled"),Tt=Nt("focus"),Et=Nt("hover"),Bt=Object.assign({React:i.a},i.a,a,r);t.a=Bt},92:function(e,t,n){"use strict";(function(e){n.d(t,"c",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return a})),n.d(t,"d",(function(){return c})),n.d(t,"b",(function(){return s})),n.d(t,"g",(function(){return f})),n.d(t,"a",(function(){return d}));var r=n(101),o=function(){return void 0!==e?e:window},i=function(){return a()&&!u()},a=function(){return"web"===r.a.OS||u()},u=function(){return"undefined"!=typeof document},c=function(){return!a()},s=function e(t){return t.reduce((function(t,n){if(!n)return t;if(Array.isArray(n)){if(0===n.length)return t;t.push.apply(t,e(n))}else t.push(n);return t}),[])},l=Function.prototype.bind.call(Function.prototype.call,Object.prototype.hasOwnProperty),f=function(e,t,n){var r,o=Object.keys(e),i=o.length;if(Object.keys(t).length!==i)return!1;for(var a=0;a<i;a++){if(r=o[a],!l(t,r))return!1;var u=n&&n[r];if(u?!u(e[r],t[r]):e[r]!==t[r])return!1}return!0},d=function(e){return Array.isArray(e)?e:[e]}}).call(this,n(29))}}]);