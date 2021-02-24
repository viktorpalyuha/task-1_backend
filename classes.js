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
        algorithm = new BubbleSort(this.algorithmData);
        break;
      case 'insertion':
        algorithm = new InsertionSort(this.algorithmData);
        break;
      case 'selection':
        algorithm = new SelectionSort(this.algorithmData);
        break;
      case 'quick':
        algorithm = new QuickSort(this.algorithmData);
        break;
    }
    return algorithm;
  }
}

class BubbleSort {
  constructor(data) {
    this.data = data;
  }

  sort() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data.length; j++) {
        if (
          this.data[j + 1] &&
          this.data[j].make_display.toLowerCase() >
            this.data[j + 1].make_display.toLowerCase()
        ) {
          const temp = this.data[j];
          this.data[j] = this.data[j + 1];
          this.data[j + 1] = temp;
        }
      }
    }

    return this.data;
  }
}

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
  const sortFactory = new Sort();
  let bubble = sortFactory.create('bubble');

  res.status(200).json(bubble.sort());
};
