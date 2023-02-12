import { FC, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../../popup";
import labelbar from "./labelbar.module.scss";

export interface INavBarProps {}

const fetchData = [
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

export const LabelBar: FC<INavBarProps> = ({}) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);

  return (
    <div className={labelbar.con}>
      <div className={labelbar.list}>
        {fetchData.map((item, index) => {
          return (
            <div key={index} className={labelbar.item}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
