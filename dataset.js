const fs = require('fs');
const path = require('path');

class Dataset {
  constructor() {
    this._data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cars.json')));
  }

  get getData() {
    return this._data;
  }
}

module.exports = new Dataset();