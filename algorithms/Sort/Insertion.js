const Algorithm = require('../index').Algorithm;

class InsertionSort extends Algorithm {
  constructor() {
    super();
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

module.exports = InsertionSort;
