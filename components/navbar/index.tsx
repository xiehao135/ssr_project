import { FC, useContext, useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../popup";
import { Topbar } from "./topbar";
import { LabelBar } from "./labelbar";
import { ITopbarProps } from "./topbar/index";
import { ILaberBarProps } from "./labelbar/index";
import { useRouter } from "next/router";

export interface INavBarProps {
  topbarData: ITopbarProps;
  labelBarData: ILaberBarProps;
}
const fetchData = [
  {
    text: "首页",
    subtext: "",
    url: "#",
    blank: false,
  },

  {
    text: "沸点",
    subtext: "南北风俗",
    url: "#",
    blank: false,
  },
  {
    text: "课程",
    subtext: "",
    url: "#",
    blank: false,
  },
  {
    text: "直播",
    subtext: "",
    url: "#",
    blank: false,
  },
  {
    text: "活动",
    subtext: "",
    url: "#",
    blank: false,
  },
  {
    text: "竞赛",
    subtext: "",
    url: "#",
    blank: false,
  },
  {
    text: "商城",
    subtext: "",
    url: "#",
    blank: true,
  },
  {
    text: "APP",
    subtext: "邀请有礼",
    url: "#",
    blank: true,
  },
  {
    text: "插件",
    subtext: "",
    url: "#",
    blank: true,
  },
  // {
  //   text: "比赛",
  //   subtext: "",
  //   url: "#",
  //   blank: false,
  // },
  // {
  //   text: "周边",
  //   subtext: "",
  //   url: "#",
  //   blank: false,
  // },
  // {
  //   text: "创作",
  //   subtext: "",
  //   url: "#",
  //   blank: false,
  // },
  // {
  //   text: "其他",
  //   subtext: "",
  //   url: "#",
  //   blank: false,
  // },
];
const fetchData2 = [
  "综合",
  "关注",
  "后端",
  "前端",
  "Android",
  "iOS",
  "人工智能",
  "开发工具",
  "代码人生",
  "阅读",
];
export const NavBar: FC<INavBarProps> = ({ topbarData, labelBarData }) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);
  const router = useRouter();

  topbarData = { textArr:fetchData };
  labelBarData = { textArr: fetchData2 };

  
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

  const [hiddenLabelBar, setHiddenLabelBar] = useState(false);

  useEffect(() => {
    if (router.route === "/") {
      setHiddenLabelBar(false);
    } else {
      const navbar = document.querySelector("#navbar") as Element;
      navbar.setAttribute("style", "height:60px");
      setHiddenLabelBar(true);
    }
  }, [router.route]);

  return (
    <div className={styles.headerCon} id="navbar">
      <header className={styles.con}>
        <Topbar {...topbarData}></Topbar>
        {hiddenLabelBar ? "" : <LabelBar {...labelBarData}></LabelBar>}
      </header>
    </div>
  );
};
