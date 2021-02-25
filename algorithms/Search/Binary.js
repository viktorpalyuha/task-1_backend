const Algorithm = require('../Algorithm/Algorithm');

class BinarySearch extends Algorithm {
  constructor() {
    super();
  }

  search(target) {
    let low = 0;
    let high = this.algorithmData.length - 1;
    let lowerCaseTarget = target.toLowerCase();
    while (low <= high) {
      const mid = Math.floor(low + high);
      const element = this.algorithmData[mid].make_display.toLowerCase();
      if (element < lowerCaseTarget) {
        low = mid + 1;
      } else if (element > lowerCaseTarget) {
        high = mid - 1;
      } else {
        return this.algorithmData[mid];
      }
    }
    return 'No target found';
  }
}

module.exports = BinarySearch;
