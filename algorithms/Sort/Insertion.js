const Algorithm = require('../index').Algorithm;

class InsertionSort extends Algorithm {
  constructor() {
    super();
  }

  sort() {
    for (let i = 1; i < this.algorithmData.length; i++) {
      let currentElement = this.algorithmData[i];
      let j = i - 1;

      while (
        j >= 0 &&
        this.algorithmData[j].make_display.toLowerCase() >
          currentElement.make_display.toLowerCase()
      ) {
        this.algorithmData[j + 1] = this.algorithmData[j];
        j--;
      }
      this.algorithmData[j + 1] = currentElement;
    }

    return this.algorithmData;
  }
}

module.exports = InsertionSort;
