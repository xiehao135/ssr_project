import { FC, useContext, useState, useRef } from "react";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import topbar from "./topbar.module.scss";

// const fetchData = [
//   {
//     text: "首页",
//     subtext: "",
//     url: "#",
//     blank: false,
//   },

//   {
//     text: "沸点",
//     subtext: "南北风俗",
//     url: "#",
//     blank: false,
//   },
//   {
//     text: "课程",
//     subtext: "",
//     url: "#",
//     blank: false,
//   },
//   {
//     text: "直播",
//     subtext: "",
//     url: "#",
//     blank: false,
//   },
//   {
//     text: "活动",
//     subtext: "",
//     url: "#",
//     blank: false,
//   },
//   {
//     text: "竞赛",
//     subtext: "",
//     url: "#",
//     blank: false,
//   },
//   {
//     text: "商城",
//     subtext: "",
//     url: "#",
//     blank: true,
//   },
//   {
//     text: "APP",
//     subtext: "邀请有礼",
//     url: "#",
//     blank: true,
//   },
//   {
//     text: "插件",
//     subtext: "",
//     url: "#",
//     blank: true,
//   },
//   // {
//   //   text: "比赛",
//   //   subtext: "",
//   //   url: "#",
//   //   blank: false,
//   // },
//   // {
//   //   text: "周边",
//   //   subtext: "",
//   //   url: "#",
//   //   blank: false,
//   // },
//   // {
//   //   text: "创作",
//   //   subtext: "",
//   //   url: "#",
//   //   blank: false,
//   // },
//   // {
//   //   text: "其他",
//   //   subtext: "",
//   //   url: "#",
//   //   blank: false,
//   // },
// ];

type labelType = {
  text: string;
  subtext?: string;
  active?: boolean;
  url?: string;
  blank?: boolean;
};

export interface ILabelProps {
  fetchData: labelType[];
}

export const Label: FC<ILabelProps> = ({ fetchData }) => {
  //   const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const listClass =
    topbar.list + " " + (userAgent === Environment.pc ? topbar.showList : topbar.phoneHide);

  //   能否配置 ：
  // 配置可以显示最多几个
  // 配置文本
  // const label = ["首页", "沸点", "课程", "直播", "活动", "竞赛", "商城", "APP", "插件"];
  // 最宽468px
  const maxItem = 9;
  console.log('aaaaaa',fetchData);

  const [label, setLabel] = useState(
    fetchData.map((item, index) => {
      if (index == 0) {
        return {
          ...item,
          active: true,
        };
      }
      return {
        ...item,
        active: false,
      };
    })
  );

  // 用来控制是否收起列表  在非pc就收起了
  const [activeLabelBtn, setActiveLabelBtn] = useState(false);
  const changeLabel = (text: labelType["text"]) => {
    setLabel(
      label.map(item => {
        item.active = item.text === text;
        return item;
      })
    );
  };

  // 配置超过后用逗号显示：
  // const [moreBtn, setMoreBtn] = useState(false);
  // 逗号是否唤起
  // const [activeMoreBtn, setActiveMoreBtn] = useState(true);

  return (
    <div className={topbar.label}>
      {userAgent !== Environment.pc && (
        <div
          className={topbar.phoneLabel}
          onClick={(): void => {
            setActiveLabelBtn(!activeLabelBtn);
          }}
        >
          {label.map(item => {
            if (item.active) {
              return item.text;
            }
          })}
          <span
            className={
              topbar.labelBtn + " " + (activeLabelBtn ? topbar.activeLabelBtn : topbar.hideLabelBtn)
            }
          ></span>
        </div>
      )}
      <ul className={listClass + " " + (activeLabelBtn && topbar.showList)}>
        {label.map((item, index) => {
          return (
            <li
              key={index}
              className={topbar.item + " " + (item.active ? topbar.activeItem : "")}
              onClick={() => changeLabel(item.text)}
            >
              {item.subtext && item.subtext !== "" && (
                <span
                  className={
                    topbar.subLabel +
                    " " +
                    (userAgent !== Environment.pc ? topbar.phoneSubLabel : "")
                  }
                >
                  {item.subtext}
                </span>
              )}
              <a
                href={item.url}
                target={item.blank ? "_blank" : ""}
                rel="nofollow noopener noreferrer"
                className={item.blank ? topbar.noHover : ""}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
