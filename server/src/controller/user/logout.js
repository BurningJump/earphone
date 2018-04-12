import Base from "../base.js";
import sha1 from "sha1";

export default class extends Base {
  // 退出登录
  async indexAction() {
    try {
      await this.session(null)
    } catch (error) {
      console.log(err)
      return this.badRequest()
    }
  }
}