import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';

export interface IArticleIntro {
  label: string;
  info: string;
  articleId: number;
  watch: number,
  like: number,
  comment: number,
  author: string,
  types: string,
  publishedAt: string;
}

interface IArticleIntroProps {
  list: Array<{ label: string; info: string; articleId: number; publishedAt: string, watch: number, like: number, comment: number, types:string, author: string }>;
  total: number;
}

const getArticleIntroData = (req: NextApiRequest, res: NextApiResponse<IArticleIntroProps>): void => {
  const { pageNo, pageSize } = req.body;
  axios
    .get(`${CMSDOMAIN}/api/article-introductions`, {
      params: {
        pageNo,
        pageSize,
      },
    })
    .then(result => {
      const { data, meta } = result.data || {};
      res.status(200).json({
        list: Object.values(data),
        total: meta.pagination.total,
      });
    });
};

export default getArticleIntroData;
