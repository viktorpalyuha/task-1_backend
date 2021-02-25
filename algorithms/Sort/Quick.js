const Algorithm = require('../Algorithm/Algorithm');

class QuickSort extends Algorithm {
  constructor() {
    super();
  }

  sort(arr = this.algorithmData, start = 0, end = arr.length) {
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

module.exports = QuickSort;
