export default class extends think.Logic {
  postAction() {
    this.allowMethods = 'post'
    this.rules = {
      phone: {
        string: true,
        require: true,
        aliasName: '手机号码'
      },
      pwd: {
        string: true,
        require: true,
        aliasName: '密码'
      },
      repwd: {
        string: true,
        require: true,
        aliasName: '第二次密码'
      }
    }
  }
}
