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
import Image from 'next/image';
import moment from 'moment';

interface IProps {
  title: string;
  description: string;
  articles: {
    list: {
      label: string;
      info: string;
      link: string;
      watch: number;
      like: number;
      comment: number;
      author: string;
      types: string;
      publishedAt: string;
    }[];
    total: number;
  };
}

const Home: NextPage<IProps & IComponentProps> = ({ title, description, articles, isSupportWebp}) => {
  const [content, setContent] = useState(articles);
  const [likeList, setLikeList] = useState([] as any);
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  function clickLike(e: any) {
    e.stopPropagation()
    let targetId = e.target.id
    const newList = content?.list
    const newLikeList = likeList
    if (newLikeList.includes(targetId)) {
      newList.map((item, index) => {
        if (item.label === targetId) {
          item.like -= 1;
        }
      })
      newLikeList.splice(newLikeList.indexOf(targetId),1)
    } else {
      newList.map((item, index) => {
        if (item.label === targetId) {
          item.like += 1;
        }
      })
      setLikeList([...likeList, targetId])
      newLikeList.push(targetId)
    }
    setContent({
      list: newList,
      total: content.total
    })
    setLikeList(newLikeList)
  }

  return (
    <div className={styles.container}>
      <main className={cName([styles.main, styles.withAnimation])} ref={mainRef}>
        <div className={styles.grid}>
          {content?.list?.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.cardHeadBlock}>{item.author}</div>
                  <div className={styles.cardHeadBlock}>{item.publishedAt}</div>
                  <div className={styles.cardHeadBlock} style={{ opacity: item.types == ' ' ? 0 : 1 }}>{
                    item.types?.split('&').map((val, ind) => (
                      <div key={index} style={{display:'flex'}}>
                        <div className={styles.cardHeadBlockChild}>{val}</div>
                        <span style={{ opacity: ind == item.types.split('&').length-1 ? 0 : 1 }}>·</span>
                      </div>
                    ))
                  }</div>
                </div>
                <h2>{item.label}</h2>
                <p>{item.info}</p>
                <div className={styles.socialList}>
                  <div className={styles.socialListBlock}>
                    <span className={styles.iconfont}>&#xe661;</span>
                    {item.watch}
                  </div>
                  <div className={styles.socialListBlock} onClick={clickLike}  id={item.label}style={{color: (likeList.includes(item.label)) ? "#34a8eb": "inherit"}}>
                    <span className={styles.iconfont} id={item.label}>&#xe655;</span>
                    {item.like != 0?item.like:''}
                  </div>
                  <div className={styles.socialListBlock}>
                    <span className={styles.iconfont}>&#xe651;</span>
                    {item.comment != 0?item.comment:''}
                  </div>
                </div>
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
        </div>
      </main>
      {/* <div className={styles.right}>
        <div>
            <a href=''>
                <Image src={ require("@/public/logo_light.png") } alt="demo"></Image>
            </a>
        </div>
      </div> */}
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
        watch: item.watch,
        like: item.like,
        comment: item.comment,
        author: item.author,
        types: item.types,
        publishedAt: moment(item.publishedAt).locale("zh-cn").startOf('day').fromNow(),
      })),
      total: articleData.total,
    },
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
