import { FC, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../../popup";
import labelbar from "./labelbar.module.scss";

export interface ILaberBarProps {
  fetchData: string[];
}



export const LabelBar: FC<ILaberBarProps> = ({ fetchData }) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);
  console.log(fetchData);

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
