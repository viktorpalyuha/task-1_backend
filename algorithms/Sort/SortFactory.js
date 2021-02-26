const BubbleSort = require('../index').BubbleSort;
const InsertionSort = require('../index').InsertionSort;
const SelectionSort = require('../index').SelectionSort;
const QuickSort = require('../index').QuickSort;

class Sort {
  static create(type) {
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

module.exports = new Sort();
