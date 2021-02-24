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

class BubbleSort {

}

class InsertionSort {

}

class SelectionSort {

}

class QuickSort {

}

module.exports.getData = (_, res) => {
  res.status(200).json({
    data: new Sort()
  });
};
