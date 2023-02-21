/*
 * @Description:文章结构的导航栏
 * @Author: Zjc
 * @Date: 2023-02-05 20:27:36
 * @LastEditTime: 2023-02-08 11:39:39
 * @LastEditors: Do not edit
 */
// 现在的问题是，获取不到scrollTop的值
// 也就无法判断当前读的是哪个标题，不能随着滚动条变化目录样式
import {
  FC,
  useEffect,
  componentDidMount,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import styles from "./styles.module.scss";

export interface ICatalogProps {
  // 留着可能要传作者、标签 ,不用的话接口就删掉
  data: string;
  id: string;
  // linkList: ILinkList[];
}
export const Catalog: FC<ICatalogProps> = ({ data }) => {
  const [headings, setHeadings] = useState([]); // heading信息
  // const [contentHeightList, setcontentHeightList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // 目录指针
  // const cata = useRef();
  useEffect(() => {
    var n = Array.from(document.querySelectorAll("h1,h2,h3"));
    var levelArr: Array<number> = []; // 渲染等级 head1 , head2
    // 这个地方头尾都有一个 h1 内容属于nav&footer 得删掉
    var element = n.slice(1, n.length - 1).map((elem: any, idx) => {
      // 循环文章 h1-3 作为目录元素
      elem.setAttribute("id", `${idx}`);
      // console.log("elem", elem);
      // console.log("ele-", elem.scroolTop);
      if (!levelArr.length) {
        // 第一个直接等级为 1
        levelArr = [1];
      } else {
        // 开始比对h1 h2 等级
        var accArr = elem.nodeName.charAt(1); // 实际等级 h1 , h2
        var curArr = levelArr.length - 1; // 指针位置，方便
        levelArr.push(getLevelNum(accArr, levelArr, curArr));
      }
      // heading 值
      return {
        id: idx,
        text: elem.innerText,
        level: levelArr[levelArr.length - 1],
      };
    });
    setHeadings(element);
    // 这个scrollTop 一直都是 0
    // window.addEventListener("scroll", handleScroll, true);
  }, []);
  // componentDidMount(() => {
  //   // 监听滚动
  //   window.addEventListener("scroll", handleScroll, true);
  //   // 获得内容高度
  //   // getChildrenHeigh();
  // });
  // 获取页面中每一栏内容的高度数组
  // const getChildrenHeigh = () => {
  //   // 获得他们的父元素节点
  //   let pageScrooll = document.querySelector(".side-navBar").parentNode;
  //   let arr = [];
  //   // console.log(this.navLists.length);
  //   // 将所有子元素的高度放入arr
  //   for (let i = 0; i < this.navLists.length; i++) {
  //     // 把所有获得到的子元素高度都放入arr中
  //     arr.push(pageScrooll.children[i].offsetTop);
  //   }
  //   // 给这个arr兜底，这样可以解决最后一个内容栏监听不到的bug，注意：如果最后一栏内容高度低于滚动条当前的高度，也不会高亮显示最后一栏的标题哦
  //   arr.push(Number.MAX_VALUE);
  //   ContentHeightList = arr;
  //   // console.log(this.ContentHeightList);
  // };
  // 监听滚轮
  const handleScroll = () => {
    // 获得当前的滚轮高度
    var scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    console.log(
      "scrollTop",
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    // let Heights = contentHeightList;
    // // 只有contentHeightList存在才监听当前高度
    // if (contentHeightList) {
    //   // console.log(scrollTop);
    //   for (let i = 0; i < Heights.length; i++) {
    //     // 如果滚轮高度大于当前所在的子元素高度 并且 滚轮高度小于下一个子元素的高度 ，那么说明滚轮在当前内容中，就激活当前的nav栏
    //     if (scrollTop >= Heights[i] && scrollTop <= Heights[i + 1]) {
    //       // console.log(i);
    //       // 那么就激活当前的nav栏
    //       // moveIndex = i;
    //       // return false;
    //     }
    //   }
    // }
  };
  const scrollToAnchor = (anchorId: number) => {
    if (anchorId) {
      // 找到锚点 id
      let anchorElement = document.getElementById(String(anchorId));
      setActiveIndex(anchorId);
      console.log("anchorId-Element", anchorId, anchorElement);
      // 如果对应id的锚点存在，就跳转到锚点
      anchorElement?.scrollIntoView({ block: "start", behavior: "smooth" });
      // 也修改一下bar的属性
    }
  };
  return (
    <div className={styles["articleCatalog"]}>
      <div className={styles.catalogTitle}>
        <p>目录</p>
      </div>
      <div
        className={styles.catalogBody}
        style={{ height: `${(headings.length + 1) * 34}px` }}
      >
        <ul className={styles.catalogList}>
          {headings.map((heading, index) => {
            const cls: any = index == activeIndex ? "catalogATag" : "";
            return (
              <li key={heading.id} className={styles.catalogItem}>
                <div className={styles[getClassName(heading.level)]}>
                  <a
                    className={styles[`${cls}`]}
                    href={`#heading-${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToAnchor(`${heading.id}`);
                    }}
                  >
                    {heading.text}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
const getClassName = (level: number) => {
  switch (level) {
    case 1:
      return "head1";
    case 2:
      return "head2";
    case 3:
      return "head3";
    default:
      return null;
  }
};
const compareLevel = (acc: number, last: number) => {
  // 比较函数 > 1为子集 = 0同级 < -1迭代前推
  return acc > last ? 1 : acc == last ? 0 : -1;
};

// 的撒旦按时大
const getLevelNum = (
  accArr: number,
  levelArr: Array<number>,
  curArr: number
): number => {
  // 获取等级 通过比较函数
  const val = compareLevel(accArr, levelArr[curArr]);
  // console.log("<--levelArr[curArr]", val, accArr, levelArr[curArr]);
  if (val == 1) {
    // 子集
    return levelArr[curArr] + 1;
  } else if (val == 0) {
    // 同级
    return levelArr[curArr];
  } else if (val == -1) {
    // 高级 递归查询
    return levelArr[curArr] == 1
      ? 1
      : getLevelNum(accArr, levelArr, curArr - 1);
  }
  return 0;
};
