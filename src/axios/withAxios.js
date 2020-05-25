import React from "react";
import configAxios from "./axios";

export default (App) => {
  return class AppWithAxios extends React.Component {
    static async getInitialProps(appContext) {
      let appProps = {};
      appContext.ctx.$axios = configAxios(appContext.ctx).init(
        appContext.ctx.req
      );

      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        $axios: appContext.ctx.$axios,
      };
    }

    constructor(props) {
      super(props);

      // 添加axios至全局
      React.Component.prototype.$axios = props.$axios || configAxios();
    }

    render() {
      return <App {...this.props} />;
    }
  };
};
