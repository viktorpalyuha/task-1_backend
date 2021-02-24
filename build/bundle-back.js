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

eval("const Dataset = __webpack_require__(/*! ./dataset */ \"./dataset.js\");\nclass Algorithm {\n  constructor() {\n    this.algorithmData = Dataset.getData;\n  }\n}\n\nclass Sort extends Algorithm {\n  constructor() {\n    super();\n  }\n\n  create(type) {\n    let algorithm;\n\n    switch (type) {\n      case 'bubble':\n        algorithm = new BubbleSort(this.data);\n        break;\n      case 'insertion':\n        algorithm = new InsertionSort(this.data);\n        break;\n      case 'selection':\n        algorithm = new SelectionSort(this.data);\n        break;\n      case 'quick':\n        algorithm = new QuickSort(this.data);\n        break;\n    }\n    algorithm.type = type;\n    return algorithm;\n  }\n}\n\nclass BubbleSort {\n\n}\n\nclass InsertionSort {\n\n}\n\nclass SelectionSort {\n\n}\n\nclass QuickSort {\n\n}\n\nmodule.exports.getData = (_, res) => {\n  res.status(200).json({\n    data: new Sort().algorithmData\n  });\n};\n\n\n//# sourceURL=webpack://back-end/./classes.js?");

/***/ }),

/***/ "./dataset.js":
/*!********************!*\
  !*** ./dataset.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\nconst path = __webpack_require__(/*! path */ \"path\");\n\nclass Dataset {\n  constructor() {\n    this._data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cars.json')));\n  }\n\n  get getData() {\n    return this._data;\n  }\n}\n\nconsole.log(Dataset._data)\n\n\nmodule.exports = new Dataset();\n\n//# sourceURL=webpack://back-end/./dataset.js?");

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