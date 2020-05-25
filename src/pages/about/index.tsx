import React from "react";
import { ArticleData, UserData } from "../../interfaces";
import axios from "axios";
import { options } from "../../axios/axios";
import Layout from "../../components/Layout";
import "./index.less";
type props = {
  userData: UserData;
  articleList: [ArticleData];
};
const AboutPage = (props: props) => {

  return (
    <Layout>
        <div>哈哈哈</div> </Layout>
  );
};
export async function getStaticProps() {
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
export default AboutPage;
