import { LOCALDOMAIN } from '@/utils';
import axios from 'axios';
import React from 'react';
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styles from './styles.module.scss';
import { IPostProps, PostContent } from '@/components/article/article';
import { RelatedProps, RelatedArticle } from '@/components/related/related';
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
  );
};

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


export default Article;
