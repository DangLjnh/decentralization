"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 *
 * @param {*} app -express app
 */
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]("./src/public"));
  app.set("view engine", "ejs"); //view engine use code html -> ejs
  app.set("views", "./src/views"); //store save code
};
var _default = configViewEngine;
exports["default"] = _default;