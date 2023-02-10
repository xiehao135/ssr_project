import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import styles from './index.module.scss';
import cName from 'classnames';
import { ThemeContext } from '@/stores/theme';
import { Pagination } from '@douyinfe/semi-ui';
import axios from 'axios';
import { LOCALDOMAIN } from '@/utils';
import { IArticleIntro } from './api/articleIntro';
import { IAuthor } from './api/author';
import App from 'next/app';
import { IComponentProps } from './_app';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  title: string;
  description: string;
  articles: {
    list: {
      label: string;
      info: string;
      link: string;
    }[];
    total: number;
  };
  authors: {
    list: {
      name: string;
      avatar: string;
      description: string;
      level: string;
    }[];
    total: number;
  };
}

const Home: NextPage<IProps & IComponentProps> = ({ title, description, articles, isSupportWebp,authors }) => {
  const [content, setContent] = useState(articles);
  const [authorInfo, setAuthorInfo] = useState(authors);
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);

  return (
    <div className={styles.container}>
      <main className={cName([styles.main, styles.withAnimation])} ref={mainRef}>
        <div
          className={cName({
            [styles.header]: true,
            [styles.headerWebp]: isSupportWebp,
          })}
        />

        <div className = {styles.userblock}>
          <div className = {styles.userblock_head}>🎖️作者榜</div>
          <div className = {styles.userblock_list}>
            {authorInfo?.list?.map((item, index)=> (
              <a href='https://www.juejin.cn' className = {styles.userblock_list_item} target="_blank">
                <div className={styles.userblock_list_item_link}>
                  <img src={item.avatar} className={styles.userblock_list_item_link_left}></img>
                  <div className={styles.userblock_list_item_link_right}>
                    <div className={styles.userblock_list_item_link_right_top}>
                      <div className={styles.userblock_list_item_link_right_top_name}>{item.name}</div>
                      <img src={item.level} width={35}></img>
                    </div>
                    <div className={styles.userblock_list_item_link_right_bottom}>{item.description}</div>
                  </div>
                </div>
              </a>
            ))
           }
          </div>
          <a href='https://www.juejin.cn' target="_blank">
            <div className={styles.userblock_bottom}>完整榜单</div>
          </a>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.grid}>
          {content?.list?.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className={styles.card}>
                <h2>{item.label} &rarr;</h2>
                <p>{item.info}</p>
              </div>
            </Link>
            // <div
            //   className={styles.card}
            //   key={index}
            //   onClick={(): void => {
            //     router.push(item.link);
            //   }}
            // >
            //   <h2>{item.label} &rarr;</h2>
            //   <p>{item.info}</p>
            // </div>
          ))}
          <div className={styles.paginationArea}>
            <Pagination
              total={content?.total}
              pageSize={6}
              onPageChange={(pageNo: number): void => {
                axios
                  .post(`${LOCALDOMAIN}/api/articleIntro`, {
                    pageNo,
                    pageSize: 6,
                  })
                  .then(({ data }) => {
                    setContent({
                      list: data.list.map((item: IArticleIntro) => ({
                        label: item.label,
                        info: item.info,
                        link: `${LOCALDOMAIN}/article/${item.articleId}`,
                      })),
                      total: data.total,
                    });
                  });
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async (context): Promise<IProps> => {
  const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/home`);
  const { data: articleData } = await axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
    pageNo: 1,
    pageSize: 6,
  });
  const { data: authorData } = await axios.post(`${LOCALDOMAIN}/api/author`);
  // axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
  //   pageNo: 1,
  //   pageSize: 6,
  // }).then((res)=>{
  //   console.log(res.data)
  // });
  // axios.post(`${LOCALDOMAIN}/api/author`).then((res)=>{
  //   console.log(res.data)
  // });

  return {
    title: homeData.title,
    description: homeData.description,
    articles: {
      list: articleData.list.map((item: IArticleIntro) => ({
        label: item.label,
        info: item.info,
        link: `${LOCALDOMAIN}/article/${item.articleId}`,
      })),
      total: articleData.total,
    },
    authors: {
      list: authorData.list.map((item: IAuthor) =>({
        name:item.name,
        avatar:item.avatar,
        description:item.description,
        level:item.level
      })),
      total: authorData.total,
    }
  };
  
  
};

// export const getServerSideProps: GetServerSideProps = async context => {
//   const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/home`);
//   const { data: articleData } = await axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
//     pageNo: 1,
//     pageSize: 6,
//   });

//   return {
//     props: {
//       title: homeData.title,
//       description: homeData.description,
//       articles: {
//         list: articleData.list.map((item: IArticleIntro) => ({
//           label: item.label,
//           info: item.info,
//           link: `${LOCALDOMAIN}/article/${item.articleId}`,
//         })),
//         total: articleData.total,
//       },
//     },
//   };
// };

// export const getStaticProps: GetStaticProps = async context => {
//   const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/home`);
//   const { data: articleData } = await axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
//     pageNo: 1,
//     pageSize: 6,
//   });

//   return {
//     props: {
//       title: homeData.title,
//       description: homeData.description,
//       articles: {
//         list: articleData.list.map((item: IArticleIntro) => ({
//           label: item.label,
//           info: item.info,
//           link: `${LOCALDOMAIN}/article/${item.articleId}`,
//         })),
//         total: articleData.total,
//       },
//     },
//   };
// };

export default Home;
