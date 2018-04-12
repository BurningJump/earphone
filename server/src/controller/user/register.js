import Base from "../base.js";
import sha1 from "sha1";

export default class extends Base {
  // 用户注册
  async indexAction() {
    try {
      const acc = this.get('phone'),
        pwd = this.get('pwd'),
        repwd = this.get('repwd')

      let data = await this.model('USER').findUser(acc)

      if (!think.isEmpty(data)) {
        return this.fail(`账户名为${acc}的用户已存在`)
      } else {
        if (pwd === repwd) {
          let id = await this.model('USER').addUser({
            acc: acc,
            pwd: sha1(pwd),
            phone: acc,
            nickname: '发烧友-' + new Date().getTime(),
            // regTime: parseInt(new Date().getTime() / 1000),
            regType: 0,
            // lastLoginTime: parseInt(new Date().getTime() / 1000)
          })
          if (id) {
            this.session(acc, phone, nickname)
          }
        } else {
          this.fail('两次密码不一致')
        }

      }

    } catch (err) {
      console.log(err)
      return this.badRequest()
    }
  }
}