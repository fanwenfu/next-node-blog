import React from "react";
import axios from "axios";
import { options } from "../../axios/axios";
import { ArticleData } from "../../interfaces";
import Layout from "../../components/Layout";
import { TimeformatDate } from "../../utils";
import "../../assets/less/index.less";
import "./index.less";
type Props = {
  articleData: ArticleData;
};

export default class Article extends React.Component<Props> {
  render() {
    const { articleData } = this.props;
    console.log(articleData);
    return (
      <Layout title={articleData.title} description={articleData.description}>
        <article className="article-container">
          <header className="introduction-container">
            <img
              src="../static/images/avatar.jpg"
              alt="Fan's logo"
              className="logo"
            />
            <div className="introduction">
              <p>{articleData.author}</p>
              <div className="post-meta">
                <time className="post-meta__date date">
                  {TimeformatDate(articleData.timestamp)}
                </time>
              </div>
            </div>
          </header>
          <div className="post-container">
            <h1 className="post-title">{articleData.title}</h1>
            <section
              className="post"
              dangerouslySetInnerHTML={{
                __html: articleData.html,
              }}
            ></section>
          </div>
        </article>
      </Layout>
    );
  }
}

export async function getServerSideProps(props: any) {
  const { params } = props;
  try {
    const res1 = await axios.get(
      options.baseURL + "/article/list?id=" + params.id
    );
    return {
      props: {
        articleData: res1.data.result,
      },
    };
  } catch (error) {
    return {
      props: {
        articleData: "",
      },
    };
  }
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
}
