import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';

export interface IAuthor {
  name: string;
  avatar: string;
  description: string;
  level: string;
}

interface IAuthorProps {
    list: Array<{ name:string; avatar:string; description:string; level:string; }>;
    total: number;
}

const getAuthorData = (req: NextApiRequest, res: NextApiResponse<IAuthorProps>): void => {
  axios.get(`${CMSDOMAIN}/api/authors`).then(result => {
      const { data, meta } = result.data || {};

      res.status(200).json({
        list: Object.values(data),
        total: meta.pagination.total,
      });
    });
};

export default getAuthorData;
