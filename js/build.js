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

/***/ "./js/cart.js":
/*!********************!*\
  !*** ./js/cart.js ***!
  \********************/
/***/ (() => {

eval("Vue.component('cart', {\r\n    data: function () {\r\n        return {\r\n            emptyCart: 'В корзине пока нет товаров',\r\n        };\r\n    },\r\n    props: [\r\n        'sum',\r\n        'cart_goods',\r\n        'add-good',\r\n        'del-good',\r\n    ],\r\n    template: `\r\n    <div class=\"cart\">\r\n        <h3>Корзина</h3>\r\n        <hr>\r\n        <div class=\"cart-list\">\r\n            <h4 v-if=\"cart_goods.length == 0\">{{emptyCart}} </h4>\r\n            <div v-for=\"good in cart_goods\">\r\n                <p>{{good.product_name}}&nbsp;&nbsp;&nbsp;{{good.quanity}} &nbsp;&nbsp;&nbsp;\r\n                    <span v-on:click=\"addGood(good.id_product)\">+</span>&nbsp;&nbsp;&nbsp;\r\n                    <span v-on:click=\"delGood(good.id_product)\">-</span>&nbsp;&nbsp;&nbsp;\r\n                </p>\r\n            </div>\r\n        </div>\r\n        <hr>\r\n        <h4><span class=\"cart-value\">{{sum}}</span></h4>\r\n    </div>\r\n    `\r\n})\n\n//# sourceURL=webpack://jsshop/./js/cart.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.js */ \"./js/cart.js\");\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cart_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.js */ \"./js/search.js\");\n/* harmony import */ var _nodata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodata.js */ \"./js/nodata.js\");\n/* harmony import */ var _nodata_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nodata_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script.js */ \"./js/script.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsshop/./js/main.js?");

/***/ }),

/***/ "./js/nodata.js":
/*!**********************!*\
  !*** ./js/nodata.js ***!
  \**********************/
/***/ (() => {

eval("Vue.component('nodata', {\r\n    data: function () {\r\n        return {\r\n            message: 'Нет данных',\r\n            load: 'Loading...'\r\n        };\r\n    },\r\n    props: [\r\n        'nodata',\r\n        'loading'\r\n    ],\r\n    template: `\r\n    <h4 v-if=\"loading === true\">{{load}} </h4>\r\n    <h4 v-else-if=\"nodata == true\">{{message}} </h4>\r\n    `\r\n})\n\n//# sourceURL=webpack://jsshop/./js/nodata.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\n\r\nvar app = new Vue({\r\n    el: '#app',\r\n    data: {\r\n        isLoading: true,\r\n        noData: false,\r\n        emptyCart: 'В корзине пока нет товаров',\r\n        goods: [],\r\n        cartGoods: [],\r\n        sum: 0,\r\n        API_URL: 'Data',\r\n    },\r\n    methods: {\r\n        openCart() {\r\n            if (document.querySelector(\".cart\").style.visibility === 'visible') {\r\n                document.querySelector(\".cart\").style.visibility = 'hidden';\r\n            }\r\n            else {\r\n                document.querySelector(\".cart\").style.visibility = 'visible';\r\n            }\r\n        },\r\n        addGood(id) {\r\n            let newCart = this.goods.find(item => item.id_product === id);\r\n            let stat = { added: newCart.product_name + ' ' + new Date() };\r\n            this.makePOSTRequest('/statistic', stat, (error) => {\r\n            });\r\n\r\n            let alreadyCart = this.cartGoods.find(item => item.id_product === id);\r\n            if (alreadyCart != undefined) {\r\n                let i = this.cartGoods.findIndex(item => item.id_product === id);\r\n                this.cartGoods[i].quanity += 1;\r\n            }\r\n            else {\r\n                newCart.quanity = 1;\r\n                this.cartGoods.push(newCart);\r\n            }\r\n            this.summary();\r\n\r\n            this.makePOSTRequest('/addGood', this.cartGoods, (error) => {\r\n\r\n            });\r\n\r\n\r\n\r\n\r\n        },\r\n        delGood(id) {\r\n            let i = this.cartGoods.findIndex(item => item.id_product === id);\r\n            let stat = { deleted: this.cartGoods[i].product_name + ' ' + new Date }\r\n            this.makePOSTRequest('/statistic', stat, () => {\r\n            });\r\n            this.cartGoods[i].quanity -= 1;\r\n            if (this.cartGoods[i].quanity <= 0) {\r\n                this.cartGoods.splice(i, 1);\r\n            }\r\n            this.summary();\r\n            this.makePOSTRequest('/addGood', this.cartGoods, (call) => {\r\n            });\r\n\r\n        },\r\n        summary() {\r\n            this.sum = 0\r\n            this.cartGoods.forEach(item => {\r\n                let x = item.price * item.quanity;\r\n                this.sum += x;\r\n            })\r\n        },\r\n\r\n        makePOSTRequest(url, data, callback) {\r\n            let xhr;\r\n\r\n            if (window.XMLHttpRequest) {\r\n                xhr = new XMLHttpRequest();\r\n            } else if (window.ActiveXObject) {\r\n                xhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n            }\r\n\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState === 4) {\r\n                    callback(xhr.responseText);\r\n                }\r\n            }\r\n\r\n            xhr.open('POST', url, true);\r\n            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');\r\n            data = JSON.stringify(data);\r\n            xhr.send(data);\r\n        },\r\n\r\n        makeGETRequest(url, callback) {\r\n            let xhr;\r\n\r\n            if (window.XMLHttpRequest) {\r\n                xhr = new XMLHttpRequest();\r\n            } else if (window.ActiveXObject) {\r\n                xhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n            }\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState === 4) {\r\n                    if (xhr.status != 200) {\r\n                        document.querySelector('.goods-list').innerHTML = `Ошибка ${xhr.status}: ${xhr.statusText}`;\r\n                    }\r\n                    else {\r\n                        callback(xhr.responseText);\r\n                    }\r\n                }\r\n            }\r\n            xhr.open('GET', url);\r\n            xhr.send();\r\n        }\r\n\r\n    },\r\n    mounted() {\r\n        this.makeGETRequest(this.API_URL, (goods) => {\r\n            this.isLoading = false,\r\n                this.goods = JSON.parse(goods)\r\n            let i = 1;\r\n            this.goods.forEach(\r\n                item => item.id_product = i++\r\n            )\r\n            if (this.goods.length == 0) {\r\n                this.noData = true;\r\n            }\r\n        }\r\n        );\r\n        this.makeGETRequest('/cart', (goods) => {\r\n            this.cartGoods = JSON.parse(goods)\r\n            this.summary();\r\n        }\r\n        );\r\n        this.makeGETRequest('/stat', (goods) => {\r\n\r\n        }\r\n        );\r\n\r\n\r\n    }\r\n\r\n})\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://jsshop/./js/script.js?");

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\n\r\nconst search = Vue.component('search', {\r\n    data: function () {\r\n        return {\r\n            title: '',\r\n        };\r\n    },\r\n    props: [\r\n        'goods',\r\n    ],\r\n    template: `\r\n    <div>\r\n    <input type=\"text\" class=\"search\" v-model=\"title\">\r\n    <button class=\"search-button\" type=\"button\" v-on:click=\"search()\">Поиск</button>\r\n    </div>\r\n    `,\r\n    methods: {\r\n        search() {\r\n            let cancel = document.querySelectorAll(\".goods-item\");\r\n            cancel.forEach(item => { item.style.border = \"1px solid black\" })\r\n            let regexp = new RegExp(\"^\" + this.title + \"+\", 'i')\r\n            this.goods.forEach(item => {\r\n                if (regexp.test(item.product_name) == true) {\r\n                    let red = document.querySelector(\".\" + \"prod\" + item.id_product);\r\n                    red.style.border = \"1px solid red\";\r\n                }\r\n            })\r\n        }\r\n    }\r\n\r\n})\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);\n\n//# sourceURL=webpack://jsshop/./js/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;