const fs = require('fs');
const path = require('path');

const data = {
  _cars: {},
  get getData() {
    return this._cars;
  },
  set setCars(cars) {
    this._cars = cars;
  }
};

fs.readFile(path.join(__dirname, 'cars.json'), (_, receivedCars) => {
  data.setCars(JSON.parse(receivedCars));
});

class Algorithm {
  constructor() {
    this.algorithmData = data.getData;
  }
}

module.exports.getData = (_, res) => {
  res.status(200).json({
    data: data.cars
  });
};
