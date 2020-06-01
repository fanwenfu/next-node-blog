import React, { useState } from "react";
import { ArticleData, UserData } from "../interfaces";
import axios from "axios";
import { options } from "../axios/axios";
import Layout from "../components/Layout";
import "../assets/less/index.less";
// import Link from 'next/link'
type props = {
  userData: UserData;
  articleList: [ArticleData];
};
const IndexPage = (props: props) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [animated, setAnimated] = useState<string>("bounceOutUp");
  const [showBlog, setShowBlog] = useState<boolean>(false);
  const [showArticle, setShowArticle] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<ArticleData>();
  const [articleList] = useState<[ArticleData]>(props.articleList);
  const [userData] = useState<UserData>(props.userData);

  const navClick = () => {
    if (!showNav) {
      setShowNav(true);
      setAnimated("bounceInDown");
    } else {
      setAnimated("bounceOutUp");
      setTimeout(() => {
        setShowNav(false);
        setAnimated("");
      }, 500);
    }

    console.log("点击了");
  };
  const onBlogClick = () => {
    setShowBlog(!showBlog);
    setShowNav(false);
  };
  const onArticleClick = async (id: string) => {
    const res: any = await axios.get("/api/article/list?id=" + id);
    console.log(res.data);
    setArticleData(res.data.result);
    setShowArticle(!showArticle);
  };
  return (
    <Layout>
      <span onClick={navClick} className="mobile btn-mobile-menu">
        {showNav ? (
          <i className="fa fa-list btn-mobile-menu__icon iconfont">&#xe6b0;</i>
        ) : (
          <i className="fa fa-list btn-mobile-menu__icon iconfont">&#xe600;</i>
        )}
        <i className="fa fa-angle-up btn-mobile-close__icon hidden"></i>
      </span>
      {/* 简历部分 */}
      <div
        className={`warpper ${showBlog ? "warpper-show-blog" : ""}`}
        style={{
          background:
            "url(/static/images/backgroundcover.jpg) top left no-repeat #666666",
          backgroundSize: "100% 100%",
        }}
      >
        {userData ? (
          <div className="panel-main">
            <div className={"panel-main_inner panel-inverted"}>
              <div className={"panel-main__content"}>
                <a href="/" title="前往 Fan's 的主页" className="blog-button">
                  <img
                    src="../static/images/avatar.jpg"
                    alt="Fan's logo"
                    className="panel-cover__logo logo"
                  />
                </a>
                <h1 className="panel-cover__title panel-title">
                  <a href="/" title="返回主页" className="blog-button">
                    {userData.name}
                  </a>
                </h1>
                <span className="panel-cover__subtitle panel-subtitle">
                  {userData.subtitle}
                </span>
                <hr className="panel-cover__divider" />
                <p className="panel-cover__description">
                  {userData.description}
                </p>
                <hr className="panel-cover__divider panel-cover__divider--secondary" />
                <p className="panel-cover__description">
                  {userData.introduction}
                </p>
                <div
                  className={`navigation-wrapper ${
                    showNav ? "visible animated" : ""
                  } ${animated}`}
                >
                  <div>
                    <nav className="cover-navigation cover-navigation--primary">
                      <ul className="navigation">
                        <li className="navigation__item">
                          <a
                            onClick={onBlogClick}
                            title="访问博客"
                            className="blog-button"
                          >
                            博客
                          </a>
                        </li>

                        {/* <li className="navigation__item">
                          <Link href={"/about"}>
                            简历
                          </Link>
                        </li> */}
                      </ul>
                    </nav>
                  </div>

                  <div>
                    <nav className="cover-navigation navigation--social">
                      <ul className="navigation">
                        <li className="navigation__item">
                          <a title="@fan 的微信" className="wechat">
                            <i className="social fa iconfont">&#xf262;</i>
                            <span className="label">Wechat</span>
                            <img
                              className={"wechat-img"}
                              src="../static/images/wechat.jpeg"
                              alt=""
                            />
                          </a>
                        </li>

                        <li className="navigation__item">
                          <a
                            href="https://github.com/fanwenfu"
                            title="@fan 的 Github"
                            target="_blank"
                          >
                            <i className="social fa iconfont">&#xe6a4;</i>
                            <span className="label">Github</span>
                          </a>
                        </li>

                        <li className="navigation__item">
                          <a title="@fan" className="qq">
                            <i className="social fa iconfont">&#xe612;</i>
                            <span className="label">QQ</span>
                            <img
                              className={"qq-img"}
                              src="../static/images/qq.jpeg"
                              alt=""
                            />
                          </a>
                        </li>

                        <li className="navigation__item">
                          <a href="mailto:fwf1024@163.com" title="Contact me">
                            <i className="social fa iconfont">&#xe65e;</i>
                            <span className="label">Email</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="panel-cover--overlay cover-blue"></div>
      </div>
      {/* 文章部分 */}
      <div className={`content-wrapper ${showBlog ? "show-blog" : ""}`}>
        <div className="content-wrapper__inner">
          {showArticle ? (
            <div
              className="content-wrapper-close"
              onClick={() => {
                setShowArticle(false);
              }}
            >
              <i
                style={{ fontSize: "20px", marginRight: "4px" }}
                className="iconfont"
              >
                &#xe608;
              </i>
              <span>返回列表</span>
            </div>
          ) : null}

          <div className="main-post-list">
            {!showArticle ? (
              <ol className="post-list">
                {articleList &&
                  articleList.length > 0 &&
                  articleList.map((item: any) => {
                    return (
                      <li key={item.id}>
                        <h2 className="post-list__post-title post-title">
                          <a
                            onClick={() => onArticleClick(item.id)}
                            title={item.title}
                          >
                            {item.title}
                          </a>
                        </h2>
                        <p className="excerpt">{item.description}</p>
                        <div className="post-list__meta">
                          <time className="post-list__meta--date date">
                            {item.date}
                          </time>
                          •{" "}
                          <span className="post-list__meta--tags tags">
                            {item.author}
                          </span>
                          <a
                            className="btn-border-small"
                            onClick={() => onArticleClick(item.id)}
                          >
                            继续阅读
                          </a>
                        </div>
                        <hr className="post-list__divider" />
                      </li>
                    );
                  })}
              </ol>
            ) : articleData ? (
              <div className="post-container">
                <header className="post-header">
                  <div className="post-meta">
                    <time className="post-meta__date date">
                      {articleData.date}
                    </time>{" "}
                    •{" "}
                    <span className="post-meta__tags tags">
                      {articleData.author}
                    </span>
                  </div>
                  <h1 className="post-title">{articleData.title}</h1>
                </header>
                <section
                  className="post"
                  dangerouslySetInnerHTML={{
                    __html: articleData.html,
                  }}
                ></section>
              </div>
            ) : null}
            <hr className="post-list__divider " />
          </div>

          <section className="footer">
            <footer>
              <span className="footer__copyright">
                本站由 <a href="http://www.fanlogs.cn">@fan</a> 创建，采用{" "}
                <a href="https://github.com/fanwenfu/next-antd-node-blog">
                  next + antd
                </a>{" "}
                作为主题，您可以在 GitHub 找到
                <a href="https://github.com/fanwenfu/next-antd-node-blog">
                  本站源码
                </a>{" "}
                - © 2020
              </span>
            </footer>
          </section>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  try {
    const [res1, res2] = await Promise.all([
      axios.get(options.baseURL + "/user?id=1"),
      axios.get(options.baseURL + "/article/list"),
    ]);
    return {
      props: {
        userData: res1.data.result,
        articleList: res2.data.result,
      },
    };
  } catch (error) {
    console.log(error, "补货到的错误");
  }
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
}
export default IndexPage;
