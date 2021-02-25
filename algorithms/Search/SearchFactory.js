const LinearSearch = require('../index').LinearSearch;
const BinarySearch = require('../index').BinarySearch;
const JumpSearch = require('../index').JumpSearch;
const InterpolationSearch = require('../index').InterpolationSearch;

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
      case 'interpolation':
        algorithm = new InterpolationSearch();
        break;
    }
    return algorithm;
  }
}

module.exports = new Search();
