/*
 * @Description:
 * @Author: Zjc
 * @Date: 2023-02-04 21:25:49
 * @LastEditTime: 2023-02-07 11:11:29
 * @LastEditors: Do not edit
 */
import { LOCALDOMAIN } from "@/utils";
import axios from "axios";
import React, { useEffect } from "react";
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import styles from "./styles.module.scss";
import { ICatalogProps, Catalog } from "../../components/catalog/index";
import { IEssayProps, Essay } from "../../components/essay/index";
import { IAuthorProps, Author} from "../../components/author/index";
// import { Catalog } from "../../components/catalog/index"; // 如果不用传值，后面就要用这个

// eslint-disable-next-line @typescript-eslint/no-var-requires
export interface IArticleProps {
  essayData: IEssayProps;
  catalogData: ICatalogProps;
  authorData: IAuthorProps;
}
// FC
export const Article: NextPage<IArticleProps> = ({
  catalogData,
  essayData,
  authorData
}) => {
  useEffect(() => {
    // window.addEventListener("scroll", handleScroll, true);
  }, []);

  const handleScroll = () => {
    // 获得当前的滚轮高度
    console.log(
      "ar-scrollTop",
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        {/* <Catalogc /> */}
        <Essay {...essayData} />
        <div className={styles.sideBar}>
          {/* 这个地方放 作者、广告插件 */}
          <Author {...authorData}/>
          <Catalog {...catalogData} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { articleId } = context.query;
  const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
    params: {
      articleId,
    },
  });
  const name =  await data?.author;
  const  authorInfo = await axios.get(`${LOCALDOMAIN}/api/authorInfo`, {
    params : {
      authorName : name
    }
  })
  return {
    props: {
      essayData: data,
      authorData: authorInfo.data
    }, // 需要拿props包裹
  };
};

// ssg;
// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [{ params: { articleId: '1' } }],
//   fallback: false,
// });

// export const getStaticProps: GetStaticProps = async context => {
//   const { articleId } = context.params as any;
//   const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
//     params: {
//       articleId,
//     },
//   });
//   return {
//     props: data,
//   };
// };

export default Article;
