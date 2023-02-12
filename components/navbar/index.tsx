import { FC, useContext, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../popup";
import { Topbar } from "./topbar";
import { LabelBar } from "./labelbar";

export interface INavBarProps {}

export const NavBar: FC<INavBarProps> = ({}) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const topbar = document.querySelector("#topbar");

      if (scrollTop > 385) {
        topbar && topbar.classList.add(styles.hiddenTopbar);
      } else {
        if (topbar && topbar.classList.contains(styles.hiddenTopbar)) {
          topbar && topbar.classList.remove(styles.hiddenTopbar);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, true);
  }, []);
  return (
    <div className={styles.headerCon}>
      <header className={styles.con} id="navbar">
        <Topbar></Topbar>
        <LabelBar></LabelBar>
      </header>
    </div>
  );
};
