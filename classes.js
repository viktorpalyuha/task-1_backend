const Dataset = require('./dataset');
class Algorithm {
  constructor() {
    this.algorithmData = Dataset.getData;
  }
}

module.exports.getData = (_, res) => {
  res.status(200).json({
    data: new Algorithm().algorithmData
  });
};
