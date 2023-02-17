import { FC, useContext, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../../popup";
import labelbar from "./labelbar.module.scss";

export interface ILaberBarProps {
  textArr: string[];
}

export const LabelBar: FC<ILaberBarProps> = ({ textArr }) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);

  const [label, setLabel] = useState(
    textArr.map((item, index) => {
      if (index == 0) {
        return {
          text: item,
          active: true,
        };
      }
      return {
        text: item,
        active: false,
      };
    })
  );

  return (
    <div className={labelbar.con} id="labelBar">
      <div className={labelbar.list}>
        {label.map((item, index) => {
          return (
            <div
              key={index}
              className={labelbar.item + " " + (item.active ? labelbar.activeItem : "")}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
