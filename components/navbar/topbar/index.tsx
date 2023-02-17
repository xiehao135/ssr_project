import { FC, useContext, useEffect, useRef } from "react";
import styles from "../styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Label } from "./label";
import { Logo } from "./logo";
import { Popup, IPopupRef } from "../../popup";
import { ILabelProps } from "./label";

export type ITopbarProps = ILabelProps;

export const Topbar: FC<ITopbarProps> = ({ fetchData }) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);
  // console.log(fetchData);

  return (
    <div className={styles.navBar} id="topbar">
      <div className={styles.logoAndLabel}>
        <Logo></Logo>
        <Label {...{ fetchData }}></Label>
      </div>
      <div className={styles.themeArea}>
        <div
          className={styles.popupText}
          onClick={(): void => {
            popupRef.current?.open();
          }}
        >
          弹窗示范
        </div>
        {userAgent === Environment.pc && <span className={styles.text}>pc端样式</span>}
        {userAgent === Environment.ipad && <span className={styles.text}>Ipad端样式</span>}
        {userAgent === Environment.mobile && <span className={styles.text}>移动端样式</span>}
        <div
          className={styles.themeIcon}
          onClick={(): void => {
            if (localStorage.getItem("theme") === Themes.light) {
              setTheme(Themes.dark);
            } else {
              setTheme(Themes.light);
            }
          }}
        ></div>
      </div>
      <Popup ref={popupRef}>
        <div>这是一个弹窗</div>
      </Popup>
    </div>
  );
};
