/*
 * @Description:文章内容
 * @Author: Zjc
 * @Date: 2023-02-04 21:25:49
 * @LastEditTime: 2023-02-05 20:41:13
 * @LastEditors: Do not edit
 */
import { LOCALDOMAIN } from "@/utils";
import axios from "axios";
import React from "react";
import { FC } from "react";

import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import styles from "./styles.module.scss";

const showdown = require("showdown");
export interface IEssayProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}
// NextPage
export const Essay: FC<IEssayProps> = ({
  title,
  author,
  description,
  createTime,
  content,
}) => {
  const converter = new showdown.Converter();
  return (
    <div className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.info}>
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
