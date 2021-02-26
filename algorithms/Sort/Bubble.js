const Algorithm = require('../index').Algorithm;

class BubbleSort extends Algorithm {
  constructor() {
    super();
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

module.exports = BubbleSort;
