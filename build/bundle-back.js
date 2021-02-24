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

/***/ "./classes.js":
/*!********************!*\
  !*** ./classes.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Dataset = __webpack_require__(/*! ./dataset */ \"./dataset.js\");\nclass Algorithm {\n  constructor() {\n    this.algorithmData = Dataset.getData;\n  }\n}\n\nclass Sort extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  create(type) {\n    let algorithm;\n\n    switch (type) {\n      case 'bubble':\n        algorithm = new BubbleSort(this.algorithmData);\n        break;\n      case 'insertion':\n        algorithm = new InsertionSort(this.algorithmData);\n        break;\n      case 'selection':\n        algorithm = new SelectionSort(this.algorithmData);\n        break;\n      case 'quick':\n        algorithm = new QuickSort(this.algorithmData);\n        break;\n    }\n    return algorithm;\n  }\n}\n\nclass BubbleSort {\n  constructor(data) {\n    this.data = data;\n  }\n\n  sort() {\n    for (let i = 0; i < this.data.length; i++) {\n      for (let j = 0; j < this.data.length; j++) {\n        if (\n          this.data[j + 1] &&\n          this.data[j].make_display.toLowerCase() >\n            this.data[j + 1].make_display.toLowerCase()\n        ) {\n          const temp = this.data[j];\n          this.data[j] = this.data[j + 1];\n          this.data[j + 1] = temp;\n        }\n      }\n    }\n\n    return this.data;\n  }\n}\n\nclass InsertionSort {}\n\nclass SelectionSort {}\n\nclass QuickSort {}\n\nclass Search extends Algorithm {\n  constructor() {\n    super();\n  }\n  create(type) {\n    let algorithm;\n\n    switch (type) {\n      case 'linear':\n        algorithm = new LinearSearch();\n        break;\n      case 'binary':\n        algorithm = new BinarySearch();\n        break;\n      case 'jump':\n        algorithm = new JumpSearch();\n        break;\n      case 'interpolation':\n        algorithm = new InterpolationSearch();\n        break;\n    }\n    return algorithm;\n  }\n}\n\nclass LinearSearch {}\n\nclass BinarySearch {}\n\nclass JumpSearch {}\n\nclass InterpolationSearch {}\n\nmodule.exports.getData = (_, res) => {\n  const sortFactory = new Sort();\n  let bubble = sortFactory.create('bubble');\n\n  res.status(200).json(bubble.sort());\n};\n\n\n//# sourceURL=webpack://back-end/./classes.js?");

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

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst classes = __webpack_require__(/*! ./classes */ \"./classes.js\");\n\nconst app = express();\n\nconst port = 8080 || 0;\n\napp.use(bodyParser.json());\napp.use(cors());\n\napp.use('/', classes.getData);\n\napp.listen(port, () => {\n  console.log(`Sever works at ${port}`);\n});\n\n\n//# sourceURL=webpack://back-end/./index.js?");

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