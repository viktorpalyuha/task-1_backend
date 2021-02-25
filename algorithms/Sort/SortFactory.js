const BubbleSort = require('./Bubble');
const InsertionSort = require('./Insertion');
const SelectionSort = require('./Selection');
const QuickSort = require('./Quick');

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

module.exports = Sort;
