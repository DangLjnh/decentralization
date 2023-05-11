"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeController = require("../controller/homeController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
/**
 *
 * @param {*} app : express app
 */

var initWebRoutes = function initWebRoutes(app) {
  router.get("/", _homeController.handleHello);
  router.get("/user", _homeController.handleUserPage);
  router.post("/users/create-user", _homeController.handleCreateNewUser);
  router.post("/user/delete-user/:id", _homeController.handleDeleteUser);
  router.get("/user/update-user/:id", _homeController.getUpdateUserPage);
  router.post("/user/update-user", _homeController.handleUpdateUser);
  return app.use("/", router);
};
var _default = initWebRoutes;
exports["default"] = _default;