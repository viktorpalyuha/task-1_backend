const LinearSearch = require('./Linear');
const BinarySearch = require('./Binary');
const JumpSearch = require('./Jump');
const TernarySearch = require('./Ternary');

class Search {
  static create(type) {
    let algorithm;

    switch (type) {
      case 'linear':
        algorithm = new LinearSearch();
        break;
      case 'binary':
        algorithm = new BinarySearch();
        break;
      case 'jump':
        algorithm = new JumpSearch();
        break;
      case 'ternary':
        algorithm = new TernarySearch();
        break;
    }
    return algorithm;
  }
}

module.exports = Search;
