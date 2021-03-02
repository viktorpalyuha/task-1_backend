const SearchFactory = require('../algorithms/index').SearchFactory;

module.exports.searchData = (req, res) => {
  const { algorithmName } = req.query;
  const { target } = req.body;

  if (!algorithmName) {
    return res.status(400).json({
      message: 'Please, provide sorting algorithm name'
    });
  }

  if (!target) {
    return res.status(400).json({
      message: 'Please, provide target'
    });
  }

  const searchingAlgorithm = SearchFactory.create(algorithmName);
  let y = searchingAlgorithm.search(target);

  return res.status(200).json(y);
};
