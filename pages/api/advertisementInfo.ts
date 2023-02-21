import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { IAdvertisementProps } from '../../components/advertisement'
import { CMSDOMAIN } from '@/utils';
import { isEmpty } from 'lodash';

const getAdvertisementInfoData = (req: NextApiRequest, res: NextApiResponse<IAdvertisementProps>): void => {
    axios.get(`${CMSDOMAIN}/api/advertisement-infos`).then(result => {
    const { jumpUrl, name, imgUrl  } = result.data || {};

    res.status(200).json({
        jumpUrl: jumpUrl,
        name: name,
        advertisementImg: {
            image: `${CMSDOMAIN}${imgUrl.data.url}`,
            text: imgUrl.data.name
        }
    });
    });
}

export default getAdvertisementInfoData

