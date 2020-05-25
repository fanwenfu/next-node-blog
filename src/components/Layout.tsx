import * as React from 'react'
// import Link from 'next/link'
import Head from 'next/head'
import "../assets/less/common.less";
type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "范文富的博客",
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/static/favicon.ico" />
    </Head>
    {children}
  </div>
);

export default Layout;
