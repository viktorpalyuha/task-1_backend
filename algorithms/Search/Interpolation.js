const Algorithm = require('../Algorithm/Algorithm');

class InterpolationSearch extends Algorithm {
  constructor() {
    super();
  }

  sort(target) {
    let low = 0;
    let high = this.algorithmData.length - 1;
    let position = 0;
    let delta = 0;

    while (
      low <= high &&
      target >= this.algorithmData[low].make_display &&
      target <= this.algorithmData[high].make_display
    ) {
      delta =
        (target - this.algorithmData[low].make_display) /
        (this.algorithmData[high].make_display - this.algorithmData[low].make_display);
      position = low + Math.floor((high - low) * delta);
      
      if (this.algorithmData[position].make_display === target) {
        return this.algorithmData[position];
      }

      if (this.algorithmData[position].make_display < target) {
        low = position + 1;
      } else {
        high = position - 1;
      }
    }
    return 'No target found';
  }
}

module.exports = InterpolationSearch;
