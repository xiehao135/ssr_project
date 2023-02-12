import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';

export interface IArticleProps {
     name: string;
     address: string;
     job: string;    
   }
   const getAuthorInfoData = (
     req: NextApiRequest,
     res: NextApiResponse<IArticleProps>
   ): void => {
     const authorName = req.query.authorName || ''
     axios.get(`${CMSDOMAIN}/api/author-infos?filters[name][$eq]=${encodeURI(authorName)}`,{
          headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
     }).then((result) =>{
          const authorInfo = result.data["0"] || {};
          res.status(200).json(authorInfo)
     })
   }
   export default getAuthorInfoData