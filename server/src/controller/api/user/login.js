import Base from "../../base.js";
import sha1 from "sha1";

export default class extends Base {

  // 用户登录
  async indexAction() {
    try {
      const acc = this.post('phone'),
        pwd = this.post('pwd')

      let data = await this.model('USER').varifyUser({
        acc: acc,
        pwd: sha1(pwd)
      })
      if (think.isEmpty(data)) {
        return this.fail('账号或密码错误')
      } else {
        this.model('USER').updateLoginTime(data)
        this.session('userinfo', data)
        this.success(data)
      }
    } catch (err) {
      console.log(err)
      return this.badRequest()
    }
  }
}