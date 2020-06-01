import * as React from "react";
// import Link from 'next/link'
import Head from "next/head";
import "../assets/less/common.less";
type Props = {
  title?: string;
  description?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "范文富的博客",
  description = "嗨，我是范文富，一名前端开发工程师. 技术栈：vue，nuxt，react，react native跨端开发，javascript，typescript，graphql，欢迎来撩",
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="google-site-verification"
        content="W52uR0g07WAYLn599p7dSgMdJYcf6bfdvf5l9SLrjSI"
      />
      <meta name="description" content={description}></meta>
      <meta property="og:url" content="http://www.fanlogs.cn"></meta>
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
      <meta
        property="og:image"
        content="http://www.fanlogs.cn/static/id_photo.jpeg"
      ></meta>
      <meta property="og:site_name" content="范文富"></meta>
      <link rel="icon" href="/static/favicon.ico" />
    </Head>
    {children}
  </div>
);

export default Layout;
