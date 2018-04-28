export default class extends think.Controller {
  __before() {
    const userInfo = await this.session('userInfo');
    // 获取用户的 session 信息，如果为空，返回 false 阻止后续的行为继续执行
    if (think.isEmpty(userInfo)) {
      return false;
    }
  }
  __call() {
    // 如果相应的Action不存在则调用该方法
  }
}
