import { FC, useContext, useRef } from "react";
import topbar from "./topbar.module.scss";
import styles from "../styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../../popup";

export interface INavBarProps {}

export const Logo: FC<INavBarProps> = ({}) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);

  return (
    <div>
      <a href="/" className={topbar.logo}>
        <span className={styles.logoIcon}></span>
        {userAgent !== Environment.mobile && <span className={topbar.fontFamily}>稀土掘金</span>}
      </a>
    </div>
  );
};
