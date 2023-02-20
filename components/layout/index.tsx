import { FC } from "react";
import { IFooterProps, Footer } from "../footer/index";
import { INavBarProps, NavBar } from "../navbar/index";
import { IAdvertisementProps, Advertisement } from '../advertisement/index'
import styles from "./styles.module.scss";

export interface ILayoutProps {
  navbarData: INavBarProps;
  footerData: IFooterProps;
  advertisementData: IAdvertisementProps;
}

export const Layout: FC<ILayoutProps & { children: JSX.Element }> = ({
  navbarData,
  footerData,
  children,
  advertisementData,
}) => {
  return (
    <div className={styles.layout}>
      <NavBar {...navbarData} />
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
        <Advertisement {...advertisementData}></Advertisement>
      </div>
      {/* <Footer {...footerData} /> */}
    </div> 
  );
};
