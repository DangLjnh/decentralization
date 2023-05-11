"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = require("../controller/apiController");
var _groupController = require("../controller/groupController");
var _userController = require("../controller/userController");
var _roleController = require("../controller/roleController");
var _JwtAction = require("../middleware/JwtAction");
var _categoryController = require("../controller/categoryController");
var _postController = require("../controller/postController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
/**
 *
 * @param {*} app : express app
 */

var initApiRoutes = function initApiRoutes(app) {
  // router.all("*", );
  router.post("/register", _apiController.handleReigster);
  router.post("/login", _apiController.handleLogin);
  router.post("/logout", _apiController.handleLogout);
  router.get("/account", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _userController.getUserAccount);

  //user routes
  router.get("/user/read", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _userController.read);
  router.post("/user/create", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _userController.create);
  router.put("/user/update", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _userController.update);
  router["delete"]("/user/delete", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _userController.deletee);
  router.get("/user/read/:id=?", _userController.getSigleUser);

  //role routes
  router.get("/role/read", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _roleController.readRole);
  router.post("/role/create", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _roleController.createRole);
  router.put("/role/update", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _roleController.updateRole);
  router["delete"]("/role/delete", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _roleController.deleteRole);
  router.get("/role/by-group", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _roleController.getRoleByGroup);
  router.post("/role/assign-to-group", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _roleController.assignRoleToGroup);

  //group routes
  router.get("/group/read", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _groupController.readFunc);
  router.post("/group/create", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _groupController.createFunc);

  //category routes
  router.get("/category/read", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _categoryController.readCategory);
  router["delete"]("/category/delete", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _categoryController.deleteCategory);
  router.post("/category/create", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _categoryController.createCategory);

  //posts routes
  router.get("/post/read/:slug=?", _postController.readPostIemBySlug);
  router.get("/post/read/category/:categoryID=?", _postController.readRelated);
  router.get("/post/read/post-category/:slug=?", _postController.readPostByCategory);
  router.get("/post/read/post-user/:username=?", _postController.readPostByUsername);
  router.get("/post/search", _postController.searchPost);
  router.get("/post/read", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _postController.readPost);
  router.get("/post/hot", _postController.readHotPost);
  router.post("/post/create", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _postController.createPost);
  router.put("/post/update", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _postController.updatePost);
  router["delete"]("/post/delete", _JwtAction.checkUserJwt, _JwtAction.checkUserPermission, _postController.deletePost);
  return app.use("/api/v1/", router);
};
var _default = initApiRoutes;
exports["default"] = _default;