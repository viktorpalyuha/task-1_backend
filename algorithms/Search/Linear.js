const Algorithm = require('../index').Algorithm;

class LinearSearch extends Algorithm {
  constructor() {
    super();
  }

  search(target) {
    let regEx = new RegExp(target, 'gmi');
    for (let i = 0; i < this.algorithmData.length; i++) {
      if (regEx.test(this.algorithmData[i].make_display)) {
        return this.algorithmData[i];
      }
    }
    return 'No target found';
  }
}

module.exports = LinearSearch;
