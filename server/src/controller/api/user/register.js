import Base from "../../base.js";
import sha1 from "sha1";

export default class extends Base {
  // 用户注册
  async postAction() {
    try {
      const acc = this.post('phone'),
        pwd = this.post('pwd'),
        repwd = this.post('repwd')

      let data = await this.model('USER').findUser(acc)

      if (!think.isEmpty(data)) {
        return this.fail(`手机号${acc}已注册!`)
      } else {
        if (pwd === repwd) {
          let id = await this.model('USER').addUser({
            acc: acc,
            pwd: sha1(pwd),
            phone: acc,
            nickname: '发烧友-' + new Date().getTime(),
            regType: 0,
          })
          if (id) {
            this.success('注册成功!')
          }
        } else {
          this.fail('两次密码不一致!')
        }

      }

    } catch (err) {
      console.log(err)
      return this.badRequest()
    }
  }
}