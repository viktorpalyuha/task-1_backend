const Algorithm = require('../Algorithm/Algorithm');

class JumpSearch extends Algorithm {
  constructor() {
    super();
  }

  search(target) {
    const lowerCaseTarget = target.toLowerCase();
    let step = Math.floor(Math.sqrt(this.algorithmData.length));
    let blockStart = 0;
    let currentStep = step;

    while (
      this.algorithmData[
        Math.min(currentStep, this.algorithmData.length) - 1
      ].make_display.toLowerCase() < lowerCaseTarget
    ) {
      blockStart = currentStep;
      currentStep += step;

      if (blockStart >= this.algorithmData.length) {
        return 'No target found';
      }
    }

    while (
      this.algorithmData[blockStart].make_display.toLowerCase() <
      lowerCaseTarget
    ) {
      blockStart++;
      if (blockStart === Math.min(currentStep, this.algorithmData.length)) {
        return 'No target found';
      }
    }

    if (
      this.algorithmData[blockStart].make_display.toLowerCase() ===
      lowerCaseTarget
    ) {
      return this.algorithmData[blockStart];
    } else {
      return 'No target found';
    }
  }
}

module.exports = JumpSearch;
