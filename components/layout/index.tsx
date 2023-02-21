import { FC } from "react";
import { IFooterProps, Footer } from "../footer/index";
import { INavBarProps, NavBar } from "../navbar/index";
import { IAdvertisementProps, Advertisement } from '../advertisement/index'
import styles from "./styles.module.scss";

export interface ILayoutProps {
  navbarData: INavBarProps;
  footerData: IFooterProps;
  advertisementData: IAdvertisementProps;
  authorInfo: authors;
}

interface authors {
  list: {
      name: string;
      avatar: string;
      description: string;
      level: string;
  }[];
  total: number;
}

export const Layout: FC<ILayoutProps & { children: JSX.Element }> = ({
  navbarData,
  footerData,
  children,
  advertisementData,
  authorInfo,
}) => {
  return (
    <div className={styles.layout}>
      <NavBar {...navbarData} />
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
        <div className={styles.right}>
          <Advertisement {...advertisementData}></Advertisement>
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
        </div>
      </div>
      {/* <Footer {...footerData} /> */}
    </div> 
  );
};
