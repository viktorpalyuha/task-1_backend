const Algorithm = require('../Algorithm/Algorithm');

class BubbleSort extends Algorithm {
  constructor() {
    super();
  }

  sort() {
    for (let i = 0; i < this.algorithmData.length; i++) {
      for (let j = 0; j < this.algorithmData.length; j++) {
        if (
          this.algorithmData[j + 1] &&
          this.algorithmData[j].make_display.toLowerCase() >
            this.algorithmData[j + 1].make_display.toLowerCase()
        ) {
          const temp = this.algorithmData[j];
          this.algorithmData[j] = this.algorithmData[j + 1];
          this.algorithmData[j + 1] = temp;
        }
      }
    }

    return this.algorithmData;
  }
}

module.exports = BubbleSort;
