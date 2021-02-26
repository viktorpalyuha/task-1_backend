const Algorithm = require('../Algorithm/Algorithm');

class InterpolationSearch extends Algorithm {
  constructor() {
    super();
  }

  search(target) {
    function countStr(str) {
      let alphabet = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ];

      let splittedString = str.toLowerCase().split('');
      let counter = 0;
      for (let i = 0; i < 1; i++) {
        let letterPosition = alphabet.indexOf(splittedString[i]) + 1;
        counter += letterPosition;
      }
      return counter;
    }

    let low = 0;
    let high = this.algorithmData.length - 1;
    let countedTarget = countStr(target);
    let position = 0;
    let delta = 0;

    while (
      low <= high &&
      target >= this.algorithmData[low].make_display &&
      target <= this.algorithmData[high].make_display
    ) {
      delta = Math.abs(
        (countedTarget - countStr(this.algorithmData[low].make_display)) /
          countStr(this.algorithmData[high].make_display) -
          countStr(this.algorithmData[low].make_display)
      );
      position = low + Math.floor((high - low) * delta);
      console.log(position);

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
