const Algorithm = require('../index').Algorithm;

class SelectionSort extends Algorithm {
  constructor() {
    super();
  }

  sort() {
    let min, temp;

    for (let i = 0; i < this.algorithmData.length; i++) {
      min = i;
      for (let j = i + 1; j < this.algorithmData.length; j++) {
        if (
          this.algorithmData[min].make_display.toLowerCase() >
          this.algorithmData[j].make_display.toLowerCase()
        ) {
          min = j;
        }
      }

      temp = this.algorithmData[i];
      this.algorithmData[i] = this.algorithmData[min];
      this.algorithmData[min] = temp;
    }

    return this.algorithmData;
  }
}

module.exports = SelectionSort;
