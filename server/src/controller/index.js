const Base = require('./base.js').default;

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
};
