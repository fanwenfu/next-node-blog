import { Provider } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import App from "next/app";
import React from "react";
import { Head } from "../next";
import { initializeStore, IStore } from "../stores/store";
import withAxios from "../axios/withAxios";
import "../assets/less/common.less";
interface IOwnProps {
  isServer: boolean;
  initialState: IStore;
}

class MyApp extends App {
  public static async getInitialProps({ Component, router, ctx }) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = typeof window === "undefined";
    const store = initializeStore(isServer);
    //
    // Check whether the page being rendered by the App has a
    // static getInitialProps method and if so call it
    //
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps,
    };
  }

  private store: IStore;

  constructor(props) {
    super(props);
    this.store = initializeStore(props.isServer, props.initialState) as IStore;
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>范文富的博客</title>
          <meta name="title" content="范文富的博客"></meta>
          <meta name="keywords" content="范文富，web前端开发，nuxt"></meta>
          <meta
            name="description"
            content="web前端开发工程师 @ 某不知名企业 技术栈：vue单页多页应用，nuxt，next，react-native，vant，mintui，ant-design-mobile-rn，GraphQL和RESTful"
          ></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
        </Head>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}

export default withAxios(MyApp);
