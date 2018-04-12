const path = require('path'),
  assert = require('assert');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
    assert(think.isFunction(this.model), 'this.model must be a function');
    this.modelInstance = this.model(this.resource);
  }
  _after() {
    // 可以在此处做访问次数统计;
    // 响应格式自定义；
    // 屏蔽导出数据的敏感字段；
    // 结合_befor()拒绝频繁调用
    // 有必要频繁调用查询相同内容的接口，可以结合_befor()和redis做快速取数操作;
    // 其他
  }
  /**
 * get resource
 * @return {String} [resource name]
 */
  getResource() {
    const filename = this.__filename || __filename,
      last = filename.lastIndexOf(path.sep);


    return filename.substr(last + 1, filename.length - last - 4);
  }
  getId() {
    const id = this.get('id');
    let last = {};

    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }
    last = this.ctx.path.split('/').slice(-1)[0];

    if (last !== this.resource) {
      return last;
    }

    return '';
  }
  async _get() {
    let data;

    if (this.id) {
      const pk = await this.modelInstance.pk;

      data = await this.modelInstance.where({ [pk]: this.id }).find();

      return this.success(data);
    }
    data = await this.modelInstance.select();

    return this.success(data);
  }
  /**
 * put resource
 * @return {Promise} []
 */
  async _postn() {
    const pk = await this.modelInstance.pk,
      data = this.post();
    let insertId = {};

    delete data[pk];
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    insertId = await this.modelInstance.add(data);


    return this.success({ id: insertId });
  }
  /**
 * delete resource
 * @return {Promise} []
 */
  async _delete() {
    if (!this.id) {
      return this.fail('params error');
    }
    const pk = await this.modelInstance.pk,
      rows = await this.modelInstance.where({ [pk]: this.id }).delete();


    return this.success({ affectedRows: rows });
  }
  /**
 * update resource
 * @return {Promise} []
 */
  async _put() {
    if (!this.id) {
      return this.fail('params error');
    }
    const pk = await this.modelInstance.pk,
      data = this.post();
    let rows = {};

    delete data[pk];
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    rows = await this.modelInstance.where({ [pk]: this.id }).update(data);

    return this.success({ affectedRows: rows });
  }
  __call() {
    return this.urlNotFound();
  }
};

