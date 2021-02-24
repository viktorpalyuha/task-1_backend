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

class InsertionSort {
  constructor(data) {
    this.data = data;
  }

  sort() {
    for (let i = 1; i < this.data.length; i++) {
      let currentElement = this.data[i];
      let j = i - 1;

      while (
        j >= 0 &&
        this.data[j].make_display.toLowerCase() >
          currentElement.make_display.toLowerCase()
      ) {
        this.data[j + 1] = this.data[j];
        j--;
      }
      this.data[j + 1] = currentElement;
    }

    return this.data;
  }
}

class SelectionSort {
  constructor(data) {
    this.data = data;
  }

  sort() {
    let min, temp;

    for (let i = 0; i < this.data.length; i++) {
      min = i;
      for (let j = i + 1; j < this.data.length; j++) {
        if (
          this.data[min].make_display.toLowerCase() >
          this.data[j].make_display.toLowerCase()
        ) {
          min = j;
        }
      }

      temp = this.data[i];
      this.data[i] = this.data[min];
      this.data[min] = temp;
    }

    return this.data;
  }
}

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
  let selection = sortFactory.create('selection');

  res.status(200).json(selection.sort());
};
