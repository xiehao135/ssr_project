import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ILayoutProps } from "../../components/layout";
import { CMSDOMAIN } from "@/utils";
import { isEmpty } from "lodash";

const getLayoutData = (req: NextApiRequest, res: NextApiResponse<ILayoutProps>): void => {
  axios.get(`${CMSDOMAIN}/api/layouts`).then(result => {
    const {
      category_lists,
      advertisement_infos,
      author_lists,
      topbar_lists,
      copy_right,
      link_lists,
      public_number,
      qr_code,
      qr_code_image,
      site_number,
      title,
    } = result.data || {};
    console.log("看看返回的数据", result.data);

    res.status(200).json({
      // navbarData: {
      //   topbarData: topbar_lists?.data,
      // labelBarData:category_lists?.data.map((item:any)=>{
      //   textArr:item.categories
      // }),
      // },
      navbarData: {},
      footerData: {
        title,
        linkList: link_lists?.data?.map((item: any) => ({
          title: item.title,
          list: item?.links?.data?.map((_item: any) => ({
            label: _item.label,
            link: isEmpty(_item.link) ? "" : _item.link,
          })),
        })),
        qrCode: {
          image: `${CMSDOMAIN}${qr_code_image.data.url}`,
          text: qr_code,
        },
        copyRight: copy_right,
        siteNumber: site_number,
        publicNumber: public_number,
      },
      advertisementData: {
        advertisementImgs: advertisement_infos?.data?.map((item: any) => ({
          image: `${CMSDOMAIN}${item.imageUrl.data?.url}`,
          text: item.imageUrl.data?.name,
          jumpUrl: item.jumpUrl,
          name: item.name,
        })),
      },
      authorInfo: {
        list: author_lists?.data?.map((item: any) => ({
          name: item.name,
          avatar: item.avatar,
          description: item.description,
          level: item.level,
        })),
        total: 0,
      },
    });
  });
};

export default getLayoutData;
