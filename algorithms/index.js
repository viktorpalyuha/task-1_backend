const Algorithm = require('./Algorithm/Algorithm');
const SortFactory = require('./Sort/SortFactory');
const BubbleSort = require('./Sort/Bubble');
const InsertionSort = require('./Sort/Insertion');
const SelectionSort = require('./Sort/Selection');
const QuickSort = require('./Sort/Quick');
const SearchFactory = require('./Search/SearchFactory');
const LinearSearch = require('./Search/Linear');
const BinarySearch = require('./Search/Binary');
const JumpSearch = require('./Search/Jump');
const InterpolationSearch = require('./Search/Interpolation');

module.exports = {
  Algorithm,
  SortFactory,
  BubbleSort,
  InsertionSort,
  SelectionSort,
  QuickSort,
  SearchFactory,
  LinearSearch,
  BinarySearch,
  JumpSearch,
  InterpolationSearch
};
