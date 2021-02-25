const Algorithm = require('../index').Algorithm;

class SelectionSort extends Algorithm {
  constructor() {
    super();
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

module.exports = SelectionSort;
