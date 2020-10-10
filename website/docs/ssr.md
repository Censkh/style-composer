---
id: ssr
title: Server Side Rendering
---

Style composer has support for server side rendering frameworks such as NextJS. When rendering on the server any elements that would usually be added to the head of the page are instead collected and kept as React elements that you can instead access via `StyleEvironment.getServerSideHeadElements()`.

## Screen Size Emulation

Usually device type can be inferred from the user agent of a request. When it can you can pass this device type to `StyleEnvironment.setDeviceType()` in order to emulate an appropriate screen size on the server. By default `"desktop"` is used.

Supported device types:

- `"mobile"` (600x1200)
- `"desktop"` (1920x1080)

## NextJs Example

```js title="next.config.js"
const {withExpo} = require("@expo/next-adapter");

module.exports = withExpo({});
```

```tsx title="pages/_app.tsx"
import React                  from "react";
import {AppContext, AppProps} from "next/app";
import Head                   from "next/head";
import {StyleEnvironment}     from "style-composer";

const NextApp = ({Component, pageProps}: AppProps) => {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
    <Component {...pageProps} />
  </>;
};

NextApp.getInitialProps = async (props: AppContext) => {
  const isMobileView = (props.ctx.req
    ? props.ctx.req.headers["user-agent"]
    : (typeof navigator !== "undefined" && navigator.userAgent) || "")?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Mobile Safari|IEMobile|WPDesktop/i,
  );

  StyleEnvironment.setDeviceType(Boolean(isMobileView) ? "mobile" : "desktop");
  return {};
};

export default NextApp;
```

```tsx title="pages/_document.tsx"
import Document, {Head, Html, Main, NextScript} from "next/document";
import React                                    from "react";
import {StyleEnvironment}                       from "style-composer";
import {getInitialProps}                        from "@expo/next-adapter/document";

class NextDocument extends Document {

  render() {
    return (
      <Html lang={"en"} data-device-type={StyleEnvironment.getDeviceType()}>
        <Head>
          <meta charSet="UTF-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          {StyleEnvironment.getServerSideHeadElements()}
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
      </Html>
    );
  }
}

NextDocument.getInitialProps = getInitialProps;

export default NextDocument;
```
