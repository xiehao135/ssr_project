import React from "react";
import { FC } from "react";

import styles from "./article.module.scss"

const showdown = require("showdown");

export interface IPostProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}

export const PostContent: FC<IPostProps> = ({
    title,
    author,
    description,
    createTime,
    content,
  }) => {
    //const {tab} = categories?.data
    const converter = new showdown.Converter();
    return (
      <div className={styles.article}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          {/* <h1>hillkl{categories?.data["categories"]}</h1> */}
          作者：{author} | 创建时间: {createTime}
        </div>
        <div className={styles.description}>{description}</div>
        <div
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
          className={styles.content}
        />
      </div>
    );
  };
