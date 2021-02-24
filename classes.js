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

class QuickSort {
  constructor(data) {
    this.data = data;
  }

  sort(arr = this.data, start = 0, end = arr.length) {
    function pivot(arr, start = 0, end = arr.length + 1) {
      function swap(arr, firstIndex, secondIndex) {
        if (arr[secondIndex]) {
          const temp = arr[firstIndex];
          arr[firstIndex] = arr[secondIndex];
          arr[secondIndex] = temp;
        }
      }

      let pivot = arr[start],
        pointer = start;

      for (let i = start; i < end; i++) {
        if (
          arr[i].make_display.toLowerCase() < pivot.make_display.toLowerCase()
        ) {
          pointer++;
          swap(arr, pointer, i);
        }
      }
      swap(arr, start, pointer);

      return pointer;
    }

    let pivotIndex = pivot(arr, start, end);

    if (start >= end) {
      return arr;
    }

    this.sort(arr, start, pivotIndex);
    this.sort(arr, pivotIndex + 1, end);

    return arr;
  }
}

class Search extends Algorithm {
  constructor() {
    super();
  }
  create(type) {
    let algorithm;

    switch (type) {
      case 'linear':
        algorithm = new LinearSearch(this.algorithmData);
        break;
      case 'binary':
        algorithm = new BinarySearch(this.algorithmData);
        break;
      case 'jump':
        algorithm = new JumpSearch(this.algorithmData);
        break;
      case 'interpolation':
        algorithm = new InterpolationSearch(this.algorithmData);
        break;
    }
    return algorithm;
  }
}

class LinearSearch {
  constructor(data) {
    this.data = data;
  }

  search(target) {
    let regEx = new RegExp(target, 'gmi');
    for (let i = 0; i < this.data.length; i++) {
      if (regEx.test(this.data[i].make_display)) {
        return this.data[i];
      }
    }
    return 'No target found';
  }
}

class BinarySearch {}

class JumpSearch {}

class InterpolationSearch {}

module.exports.getData = (_, res) => {
  const searchFactory = new Search();
  let linear = searchFactory.create('linear');

  res.status(200).json(linear.search('xedos'));
};
