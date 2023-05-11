"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();

// const noneSecurePath = ["/", "/register", "login"];

var extractToken = function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};
var createJwt = function createJwt(payload) {
  try {
    var token = _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
var verifyToken = function verifyToken(token) {
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
var checkUserJwt = function checkUserJwt(req, res, next) {
  // if (noneSecurePath.includes(req.path)) return next();
  var tokenFromHeaders = extractToken(req);
  var cookies = req.cookies;
  if (tokenFromHeaders) {
    var access_token = cookies && cookies.access_token ? cookies.access_token : tokenFromHeaders;
    var decoded = verifyToken(access_token);
    if (decoded) {
      req.user = decoded;
      // req.access_token = access_token;
      next();
    } else {
      return res.status(401).json({
        EM: "Not authenticated the user",
        EC: -1,
        DT: ""
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: -1,
      DT: ""
    });
  }
};
var checkUserPermission = function checkUserPermission(req, res, next) {
  // if (noneSecurePath.includes(req.path)) return next();
  if ((req === null || req === void 0 ? void 0 : req.path) === "/account") return next();
  if (req !== null && req !== void 0 && req.user) {
    var _req$user = req === null || req === void 0 ? void 0 : req.user,
      email = _req$user.email,
      role = _req$user.role;
    var currentUrl = req === null || req === void 0 ? void 0 : req.path;
    var canAccess = role === null || role === void 0 ? void 0 : role.some(function (item) {
      return item.url === currentUrl;
    });
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EM: "You don't have perrmisson to access this resource!",
        EC: -1,
        DT: ""
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: -1,
      DT: ""
    });
  }
};
module.exports = {
  createJwt: createJwt,
  verifyToken: verifyToken,
  checkUserJwt: checkUserJwt,
  checkUserPermission: checkUserPermission
};