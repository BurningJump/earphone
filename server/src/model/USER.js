export default class extends think.Model {
  /* 增加用户 */
  async addUser(obj) {
    return this.model('USER').add({
      acc: obj.acc,
      pwd: obj.pwd,
      nickname: obj.nickname || '',
      phone: obj.phone || '',
      email: obj.email || '',
      regTime: parseInt(new Date().getTime() / 1000),
      regType: obj.regType,
      weibo: obj.weibo || '',
      wechat: obj.wechat || '',
      qq: obj.qq || '',
      lastLoginTime: parseInt(new Date().getTime() / 1000)
    });
  }

  /* 查找用户 */
  findUser(acc) {
    return this.model('USER').where({ acc: acc, phone: acc, _logic: 'OR' }).find()
  }

  /* 验证账号密码 */
  varifyUser(obj) {
    return this.model('USER').field('acc,phone,nickname,gender,regType,regTime,weibo,wechat,qq,email,level,phoneValidate,emailValidate,qqValidate,wechatValidate,weiboValidate,type').where({ acc: obj.acc, pwd: obj.pwd }).find()
  }

  /* 更新最后登录时间 */
  updateLoginTime(obj) {
    this.model('USER').where({ acc: obj.acc, pwd: obj.pwd}).update({ lastLoginTime: parseInt(new Date().getTime() / 1000)})
  }
}
