const Algorithm = require('../Algorithm/Algorithm');

class TernarySearch extends Algorithm {
  constructor() {
    super();
  }

  search(
    target,
    low = 0,
    high = this.algorithmData.length - 1,
    arr = this.algorithmData
  ) {
    while (high >= low) {
      const lowerCaseTarget = target.toLowerCase();
      let mid1 = Math.floor(low + (high - low) / 3);
      let mid2 = Math.floor(high - (high - low) / 3);

      if (arr[mid1].make_display.toLowerCase() === lowerCaseTarget) {
        return arr[mid1];
      }
      if (arr[mid2].make_display.toLowerCase() === lowerCaseTarget) {
        return arr[mid2];
      }

      if (lowerCaseTarget < arr[mid1].make_display.toLowerCase()) {
        high = mid1 - 1;
      } else if (lowerCaseTarget > arr[mid2].make_display.toLowerCase()) {
        low = mid2 + 1;
      } else {
        low = mid1 + 1;
        high = mid2 - 1;
      }
    }

    return 'No target found';
  }
}

module.exports = TernarySearch;
