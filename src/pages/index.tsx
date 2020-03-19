import React from "react";
import { Head } from "../next";
import { Button } from "antd";
import { SampleComponent } from "../components/SampleComponent";
import "../assets/less/style.less";
import "../assets/less/index.less";
interface IProps {
  userData?: any;
  articleList?: any;
}

interface IState {
  showNav: boolean;
  animated: "" | "bounceInDown" | "bounceOutUp";
  showBlog: boolean;
}
class IndexPage extends React.Component<IProps, IState> {
  // 异步获取 JS 普通对象，并绑定在props上当服务渲染时, 我是最先执行的声明周期函数  first
  static async getInitialProps({ $axios }) {
    //   $axios.get("/product/list");
    const [res1, res2] = await Promise.all([
      $axios.get("/user?id=1"),
      $axios.get("/article/list")
    ]);
    const userData = res1.data.result;
    const articleList = res2.data.result;

    return { userData, articleList };
  }
  // 构造函数， 我是 second
  constructor(props) {
    super(props);
    // 定义state数据
    this.state = {
      showNav: false,
      animated: "",
      showBlog: false
    };
  }
  componentDidMount() {
    console.log(this.props.userData, this.props.articleList, "请求回来的数据");
  }
  navClick = () => {
    if (!this.state.showNav) {
      this.setState({
        showNav: true,
        animated: "bounceInDown"
      });
    } else {
      this.setState({
        animated: "bounceOutUp"
      });
      setTimeout(() => {
        this.setState({
          showNav: false,
          animated: ""
        });
      }, 500);
    }

    console.log("点击了");
  };
  onBlogClick = () => {
    this.setState({
      showBlog: !this.state.showBlog
    });
  };
  public render() {
    return (
      <div>
        <Head>
          <title>fan's blog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {/* <SampleComponent title={"Index Page"} linkTo="/other" /> */}
        <span onClick={this.navClick} className="mobile btn-mobile-menu">
          {this.state.showNav ? (
            <i className="fa fa-list btn-mobile-menu__icon iconfont">
              &#xe6b0;
            </i>
          ) : (
            <i className="fa fa-list btn-mobile-menu__icon iconfont">
              &#xe600;
            </i>
          )}
          <i className="fa fa-angle-up btn-mobile-close__icon hidden"></i>
        </span>
        <div
          className={"warpper"}
          style={{
            background:
              "url(/static/images/backgroundcover.jpg) top left no-repeat #666666",
            backgroundSize: "100% 100%",
            width: this.state.showBlog ? "30%" : "100%"
          }}
        >
          {this.props.userData ? (
            <div className="panel-main">
              <div className={"panel-main_inner panel-inverted"}>
                <div className={"panel-main__content"}>
                  <a
                    href="/#blog"
                    title="前往 OneV's Den 的主页"
                    className="blog-button"
                  >
                    <img
                      src="/static/images/avatar.jpg"
                      alt="OneV's Den logo"
                      className="panel-cover__logo logo"
                    />
                  </a>
                  <h1 className="panel-cover__title panel-title">
                    <a
                      href="/#blog"
                      title="link to homepage for OneV's Den"
                      className="blog-button"
                    >
                      {this.props.userData.name}
                    </a>
                  </h1>
                  <span className="panel-cover__subtitle panel-subtitle">
                    {this.props.userData.subtitle}
                  </span>
                  <hr className="panel-cover__divider" />
                  <p className="panel-cover__description">
                    {this.props.userData.description}
                  </p>
                  <hr className="panel-cover__divider panel-cover__divider--secondary" />
                  <p className="panel-cover__description">
                    <a href="https://objccn.io/products/">
                      {this.props.userData.introduction}
                    </a>
                  </p>
                  <div
                    className={`navigation-wrapper ${
                      this.state.showNav ? "visible animated" : ""
                    } ${this.state.animated}`}
                  >
                    <div>
                      <nav className="cover-navigation cover-navigation--primary">
                        <ul className="navigation">
                          <li className="navigation__item">
                            <a
                              onClick={this.onBlogClick}
                              title="访问博客"
                              className="blog-button"
                            >
                              博客
                            </a>
                          </li>

                          <li className="navigation__item">
                            <a href="/" title="我的简历">
                              简历
                            </a>
                          </li>
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
                                src="/static/images/Wechat.jpeg"
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
                                src="/static/images/qq.jpeg"
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
        <div
          className="content-wrapper"
          style={{
            width: this.state.showBlog ? "70%" : "0"
          }}
        >
          <div className="content-wrapper__inner">
            <div className="content-wrapper-close" onClick={this.onBlogClick}>
              <i className="iconfont">&#xe600;</i>
            </div>
            <div className="main-post-list">
              <ol className="post-list">
                {this.props.articleList.map((item: any) => {
                  return (
                    <li key={item.id}>
                      <h2 className="post-list__post-title post-title">
                        <a
                          href="/2020/03/improve-delegate/"
                          title="访问 使用 protocol 和 callAsFunction 改进 Delegate"
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
                        <span className="post-list__meta--tags tags">fan</span>
                        <a
                          className="btn-border-small"
                          href="/2020/03/improve-delegate/"
                        >
                          继续阅读
                        </a>
                      </div>
                      <hr className="post-list__divider" />
                    </li>
                  );
                })}
              </ol>
              <hr className="post-list__divider " />
            </div>

            <section className="footer">
              <footer>
                <span className="footer__copyright">
                  本站由 <a href="https://onev.cat">@fan</a> 创建，采用{" "}
                  <a href="https://github.com/onevcat/vno-jekyll">
                    next + antd
                  </a>{" "}
                  作为主题，您可以在 GitHub 找到
                  <a href="https://github.com/fanwenfu/fan-blog">本站源码</a> -
                  © 2020
                </span>
              </footer>
            </section>
          </div>
        </div>
        {/* {this.props.userData.map((item: any) => {
          return (
            <div className={"container container222"} key={item.id}>
              {item.name}
            </div>
          );
        })} */}
        {/* <button
          type="button"
          // Note how the "error" className is accessed as a property on the imported
          // `styles` object.
          classNameName={styles.error}
        >
          Destroy
        </button> */}
      </div>
    );
  }
}

export default IndexPage;
