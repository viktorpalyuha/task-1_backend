/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./algorithms/Algorithm/Algorithm.js":
/*!*******************************************!*\
  !*** ./algorithms/Algorithm/Algorithm.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Dataset = __webpack_require__(/*! ../../dataset */ \"./dataset.js\");\n\nclass Algorithm {\n  constructor() {\n    this.algorithmData = Dataset.getData;\n  }\n\n  sort() {\n    return;\n  }\n\n  search() {\n    return;\n  }\n}\n\nmodule.exports = Algorithm;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Algorithm/Algorithm.js?");

/***/ }),

/***/ "./algorithms/Search/Binary.js":
/*!*************************************!*\
  !*** ./algorithms/Search/Binary.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass BinarySearch extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  search(target) {\n    let low = 0;\n    let high = this.algorithmData.length - 1;\n    let lowerCaseTarget = target.toLowerCase();\n    while (low <= high) {\n      const mid = Math.floor(low + high);\n      const element = this.algorithmData[mid].make_display.toLowerCase();\n      if (element < lowerCaseTarget) {\n        low = mid + 1;\n      } else if (element > lowerCaseTarget) {\n        high = mid - 1;\n      } else {\n        return this.algorithmData[mid];\n      }\n    }\n    return 'No target found';\n  }\n}\n\nmodule.exports = BinarySearch;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Search/Binary.js?");

/***/ }),

/***/ "./algorithms/Search/Interpolation.js":
/*!********************************************!*\
  !*** ./algorithms/Search/Interpolation.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass InterpolationSearch extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  sort(target) {\n    let low = 0;\n    let high = this.algorithmData.length - 1;\n    let position = -1;\n    let delta = -1;\n\n    while (\n      low <= high &&\n      target >= this.algorithmData[low]&&\n      target <= this.algorithmData[high]\n    ) {\n      delta =\n        (target - this.algorithmData[low].make_display) /\n        (this.algorithmData[high].make_display - this.algorithmData[low].make_display);\n      position = low + Math.floor((high - low) * delta);\n      console.log(delta)\n      if (this.algorithmData[position].make_display === target) {\n        return this.algorithmData[position];\n      }\n\n      if (this.algorithmData[position].make_display < target) {\n        low = position + 1;\n      } else {\n        high = position - 1;\n      }\n    }\n    return 'No target found';\n  }\n}\n\nmodule.exports = InterpolationSearch;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Search/Interpolation.js?");

/***/ }),

/***/ "./algorithms/Search/Jump.js":
/*!***********************************!*\
  !*** ./algorithms/Search/Jump.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass JumpSearch extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  search(target) {\n    const lowerCaseTarget = target.toLowerCase();\n    let step = Math.floor(Math.sqrt(this.algorithmData.length));\n    let blockStart = 0;\n    let currentStep = step;\n\n    while (\n      this.algorithmData[\n        Math.min(currentStep, this.algorithmData.length) - 1\n      ].make_display.toLowerCase() < lowerCaseTarget\n    ) {\n      blockStart = currentStep;\n      currentStep += step;\n\n      if (blockStart >= this.algorithmData.length) {\n        return 'No target found';\n      }\n    }\n\n    while (\n      this.algorithmData[blockStart].make_display.toLowerCase() <\n      lowerCaseTarget\n    ) {\n      blockStart++;\n      if (blockStart === Math.min(currentStep, this.algorithmData.length)) {\n        return 'No target found';\n      }\n    }\n\n    if (\n      this.algorithmData[blockStart].make_display.toLowerCase() ===\n      lowerCaseTarget\n    ) {\n      return this.algorithmData[blockStart];\n    } else {\n      return 'No target found';\n    }\n  }\n}\n\nmodule.exports = JumpSearch;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Search/Jump.js?");

/***/ }),

/***/ "./algorithms/Search/Linear.js":
/*!*************************************!*\
  !*** ./algorithms/Search/Linear.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass LinearSearch extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  search(target) {\n    let regEx = new RegExp(target, 'gmi');\n    for (let i = 0; i < this.algorithmData.length; i++) {\n      if (regEx.test(this.algorithmData[i].make_display)) {\n        return this.algorithmData[i];\n      }\n    }\n    return 'No target found';\n  }\n}\n\nmodule.exports = LinearSearch;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Search/Linear.js?");

/***/ }),

/***/ "./algorithms/Search/SearchFactory.js":
/*!********************************************!*\
  !*** ./algorithms/Search/SearchFactory.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const LinearSearch = __webpack_require__(/*! ./Linear */ \"./algorithms/Search/Linear.js\");\nconst BinarySearch = __webpack_require__(/*! ./Binary */ \"./algorithms/Search/Binary.js\");\nconst JumpSearch = __webpack_require__(/*! ./Jump */ \"./algorithms/Search/Jump.js\");\nconst InterpolationSearch = __webpack_require__(/*! ./Interpolation */ \"./algorithms/Search/Interpolation.js\");\n\nclass Search {\n  static create(type) {\n    let algorithm;\n\n    switch (type) {\n      case 'linear':\n        algorithm = new LinearSearch();\n        break;\n      case 'binary':\n        algorithm = new BinarySearch();\n        break;\n      case 'jump':\n        algorithm = new JumpSearch();\n        break;\n      case 'interpolation':\n        algorithm = new InterpolationSearch();\n        break;\n    }\n    return algorithm;\n  }\n}\n\nmodule.exports = Search;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Search/SearchFactory.js?");

/***/ }),

/***/ "./algorithms/Sort/Bubble.js":
/*!***********************************!*\
  !*** ./algorithms/Sort/Bubble.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass BubbleSort extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  sort() {\n    for (let i = 0; i < this.algorithmData.length; i++) {\n      for (let j = 0; j < this.algorithmData.length; j++) {\n        if (\n          this.algorithmData[j + 1] &&\n          this.algorithmData[j].make_display.toLowerCase() >\n            this.algorithmData[j + 1].make_display.toLowerCase()\n        ) {\n          const temp = this.algorithmData[j];\n          this.algorithmData[j] = this.algorithmData[j + 1];\n          this.algorithmData[j + 1] = temp;\n        }\n      }\n    }\n\n    return this.algorithmData;\n  }\n}\n\nmodule.exports = BubbleSort;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Sort/Bubble.js?");

/***/ }),

/***/ "./algorithms/Sort/Insertion.js":
/*!**************************************!*\
  !*** ./algorithms/Sort/Insertion.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass InsertionSort extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  sort() {\n    for (let i = 1; i < this.algorithmData.length; i++) {\n      let currentElement = this.algorithmData[i];\n      let j = i - 1;\n\n      while (\n        j >= 0 &&\n        this.algorithmData[j].make_display.toLowerCase() >\n          currentElement.make_display.toLowerCase()\n      ) {\n        this.algorithmData[j + 1] = this.algorithmData[j];\n        j--;\n      }\n      this.algorithmData[j + 1] = currentElement;\n    }\n\n    return this.algorithmData;\n  }\n}\n\nmodule.exports = InsertionSort;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Sort/Insertion.js?");

/***/ }),

/***/ "./algorithms/Sort/Quick.js":
/*!**********************************!*\
  !*** ./algorithms/Sort/Quick.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass QuickSort extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  sort(arr = this.algorithmData, start = 0, end = arr.length) {\n    function pivot(arr, start = 0, end = arr.length + 1) {\n      function swap(arr, firstIndex, secondIndex) {\n        if (arr[secondIndex]) {\n          const temp = arr[firstIndex];\n          arr[firstIndex] = arr[secondIndex];\n          arr[secondIndex] = temp;\n        }\n      }\n\n      let pivot = arr[start],\n        pointer = start;\n\n      for (let i = start; i < end; i++) {\n        if (\n          arr[i].make_display.toLowerCase() < pivot.make_display.toLowerCase()\n        ) {\n          pointer++;\n          swap(arr, pointer, i);\n        }\n      }\n      swap(arr, start, pointer);\n\n      return pointer;\n    }\n\n    let pivotIndex = pivot(arr, start, end);\n\n    if (start >= end) {\n      return arr;\n    }\n\n    this.sort(arr, start, pivotIndex);\n    this.sort(arr, pivotIndex + 1, end);\n\n    return arr;\n  }\n}\n\nmodule.exports = QuickSort;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Sort/Quick.js?");

/***/ }),

/***/ "./algorithms/Sort/Selection.js":
/*!**************************************!*\
  !*** ./algorithms/Sort/Selection.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Algorithm = __webpack_require__(/*! ../Algorithm/Algorithm */ \"./algorithms/Algorithm/Algorithm.js\");\n\nclass SelectionSort extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  sort() {\n    let min, temp;\n\n    for (let i = 0; i < this.algorithmData.length; i++) {\n      min = i;\n      for (let j = i + 1; j < this.algorithmData.length; j++) {\n        if (\n          this.algorithmData[min].make_display.toLowerCase() >\n          this.algorithmData[j].make_display.toLowerCase()\n        ) {\n          min = j;\n        }\n      }\n\n      temp = this.algorithmData[i];\n      this.algorithmData[i] = this.algorithmData[min];\n      this.algorithmData[min] = temp;\n    }\n\n    return this.algorithmData;\n  }\n}\n\nmodule.exports = SelectionSort;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Sort/Selection.js?");

/***/ }),

/***/ "./algorithms/Sort/SortFactory.js":
/*!****************************************!*\
  !*** ./algorithms/Sort/SortFactory.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const BubbleSort = __webpack_require__(/*! ./Bubble */ \"./algorithms/Sort/Bubble.js\");\nconst InsertionSort = __webpack_require__(/*! ./Insertion */ \"./algorithms/Sort/Insertion.js\");\nconst SelectionSort = __webpack_require__(/*! ./Selection */ \"./algorithms/Sort/Selection.js\");\nconst QuickSort = __webpack_require__(/*! ./Quick */ \"./algorithms/Sort/Quick.js\");\n\nclass Sort {\n  static create(type) {\n    let algorithm;\n\n    switch (type) {\n      case 'bubble':\n        algorithm = new BubbleSort();\n        break;\n      case 'insertion':\n        algorithm = new InsertionSort();\n        break;\n      case 'selection':\n        algorithm = new SelectionSort();\n        break;\n      case 'quick':\n        algorithm = new QuickSort();\n        break;\n    }\n\n    return algorithm;\n  }\n}\n\nmodule.exports = Sort;\n\n\n//# sourceURL=webpack://back-end/./algorithms/Sort/SortFactory.js?");

/***/ }),

/***/ "./algorithms/index.js":
/*!*****************************!*\
  !*** ./algorithms/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const SortFactory = __webpack_require__(/*! ./Sort/SortFactory */ \"./algorithms/Sort/SortFactory.js\");\nconst SearchFactory = __webpack_require__(/*! ./Search/SearchFactory */ \"./algorithms/Search/SearchFactory.js\");\n\nmodule.exports = {\n  SortFactory,\n  SearchFactory\n};\n\n\n//# sourceURL=webpack://back-end/./algorithms/index.js?");

/***/ }),

/***/ "./controllers/search.js":
/*!*******************************!*\
  !*** ./controllers/search.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const SearchFactory = __webpack_require__(/*! ../algorithms/index */ \"./algorithms/index.js\").SearchFactory;\n\nmodule.exports.searchData = (req, res) => {\n  const { algorithmName } = req.query;\n  const { target } = req.body;\n\n  if (!algorithmName) {\n    return res.status(400).json({\n      message: 'Please, provide sorting algorithm name'\n    });\n  }\n\n  if (!target) {\n    return res.status(400).json({\n      message: 'Please, provide target'\n    });\n  }\n\n  const searchingAlgorithm = SearchFactory.create(algorithmName);\n  return res.status(200).json(searchingAlgorithm.search(target));\n};\n\n\n//# sourceURL=webpack://back-end/./controllers/search.js?");

/***/ }),

/***/ "./controllers/sort.js":
/*!*****************************!*\
  !*** ./controllers/sort.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const SortFactory = __webpack_require__(/*! ../algorithms/index */ \"./algorithms/index.js\").SortFactory;\n\nmodule.exports.sortData = (req, res) => {\n  const { algorithmName } = req.query;\n\n  if (!algorithmName) {\n    return res.status(400).json({\n      message: 'Please, provide sorting algorithm name'\n    });\n  }\n\n  const sortingAlgorithm = SortFactory.create(algorithmName);\n  return res.status(200).json(sortingAlgorithm.sort());\n};\n\n\n//# sourceURL=webpack://back-end/./controllers/sort.js?");

/***/ }),

/***/ "./dataset.js":
/*!********************!*\
  !*** ./dataset.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\nconst path = __webpack_require__(/*! path */ \"path\");\n\nclass Dataset {\n  constructor() {\n    this._data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cars.json')));\n  }\n\n  get getData() {\n    return this._data;\n  }\n}\n\nmodule.exports = new Dataset();\n\n//# sourceURL=webpack://back-end/./dataset.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst sortController = __webpack_require__(/*! ./controllers/sort */ \"./controllers/sort.js\");\nconst searchController = __webpack_require__(/*! ./controllers/search */ \"./controllers/search.js\");\n\nconst app = express();\n\nconst port = 8080 || 0;\n\napp.use(bodyParser.json());\napp.use(cors());\n\napp.use('/sort', sortController.sortData);\napp.use('/search', searchController.searchData);\n\napp.listen(port, () => {\n  console.log(`Sever works at ${port}`);\n});\n\n\n//# sourceURL=webpack://back-end/./index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;