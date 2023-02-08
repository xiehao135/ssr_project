/*
 * @Description:
 * @Author: Zjc
 * @Date: 2023-02-07 02:38:59
 * @LastEditTime: 2023-02-07 11:11:09
 * @LastEditors: Do not edit
 */
// 测试一些功能的地方，后面直接删掉catalogc文件
import React, { Component, createRef } from "react";
class Catalogc extends Component {
  scrollHandler = this.handleScroll.bind(this);
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "rgba(34,34,34,0)",
      headerRef: createRef(),
    };
  }
  handleScroll(event) {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // this._handleScroll(scrollTop);
    console.log("scrollTop", scrollTop);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  render() {
    return (
      <p>
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
        11
        <br />
      </p>
    );
  }
}
// export default Catalogc;
module.exports = Catalogc;
