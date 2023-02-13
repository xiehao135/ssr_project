import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';
import { LOCALDOMAIN } from '@/utils';
import { IArticleProps } from '../article/[articleId]';
import { isEmpty } from 'lodash';

const getArticleInfoData = (req: NextApiRequest, res: NextApiResponse<IArticleProps>): void => {
  const { articleId } = req.query;
  const related_arr = []
  axios.get(`${CMSDOMAIN}/api/article-infos/${articleId}`).then(result => {
    const { title, author, description, createTime, content, articleId, category } = result.data || {};
    category?.data[0]?.article_infos.data.forEach(item => {
      item.articleId != articleId && related_arr.push(item)
    });
    res.status(200).json({
      articleData: {
        title,
        author,
        description,
        createTime,
        content
      },
      relatedData:{
        title: "相关文章",
        list: related_arr.map((_item:any) => ({
          title:_item.title,
          link: `${LOCALDOMAIN}/article/${_item.articleId}`
        }))
      }
    });
  });
};

export default getArticleInfoData;
