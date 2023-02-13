import { LOCALDOMAIN } from '@/utils';
import axios from 'axios';
import React from 'react';
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styles from './styles.module.scss';
import { IPostProps, PostContent } from '@/components/article/article';
import { RelatedProps, RelatedArticle } from '@/components/page/Post/related/related';
import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const showdown = require('showdown');

export interface IArticleProps {
  articleData: IPostProps,
  relatedData: RelatedProps
}

const Article: NextPage<IArticleProps> = ({ 
  articleData,
  relatedData 
}) => {
  const converter = new showdown.Converter();
  
  return (
    <main className={styles['main-content']}>
      <div className={styles.article}>
        <PostContent {...articleData} />
      </div>
      <aside className={clsx(styles.sidebar)}>
          <RelatedArticle title={relatedData.title} list={relatedData.list} />
      </aside>
    </main>
    // <div className={styles.article}>
    //   <h1 className={styles.title}>{title}</h1>
    //   <div className={styles.info}>
    //     作者：{author} | 创建时间: {createTime}
    //   </div>
    //   <div className={styles.description}>{description}</div>
    //   <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} className={styles.content} />
    // </div>
  );
};

// Article.getInitialProps = async (context): Promise<IArticleProps> => {
//   // debugger;
//   const { articleId } = context.query;
//   const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
//     params: {
//       articleId,
//     },
//   });
//   return data;
// };

export const getServerSideProps: GetServerSideProps = async context => {
  const { articleId } = context.query;
  const { data: infoData } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
    params: {
      articleId,
    },
  });
  return {
    props: {
      articleData: infoData.articleData,
      relatedData: infoData.relatedData,
    }
    
  }
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
