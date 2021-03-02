const SortFactory = require('../algorithms/index').SortFactory;

module.exports.sortData = (req, res) => {
  const { algorithmName } = req.query;

  if (!algorithmName) {
    return res.status(400).json({
      message: 'Please, provide sorting algorithm name'
    });
  }

  const sortingAlgorithm = SortFactory.create(algorithmName);
  return res.status(200).json(sortingAlgorithm.sort());
};
