const Dataset = require('./dataset');
class Algorithm {
  constructor() {
    this.algorithmData = Dataset.getData;
  }
}

class Sort extends Algorithm {
  constructor() {
    super();
  }

  create(type) {
    let algorithm;

    switch (type) {
      case 'bubble':
        algorithm = new BubbleSort();
        break;
      case 'insertion':
        algorithm = new InsertionSort();
        break;
      case 'selection':
        algorithm = new SelectionSort();
        break;
      case 'quick':
        algorithm = new QuickSort();
        break;
    }
    return algorithm;
  }
}

class BubbleSort {}

class InsertionSort {}

class SelectionSort {}

class QuickSort {}

class Search extends Algorithm {
  constructor() {
    super();
  }
  create(type) {
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

class LinearSearch {}

class BinarySearch {}

class JumpSearch {}

class InterpolationSearch {}

module.exports.getData = (_, res) => {
  res.status(200).json(new Search());
};
