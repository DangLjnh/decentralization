"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _api = _interopRequireDefault(require("./routes/api"));
var _web = _interopRequireDefault(require("./routes/web"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var fileUpload = require("express-fileupload");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: "dwkckmmr7",
  api_key: "573416668123248",
  api_secret: "7HRHCsa7CH7LBGfz8AGsWbLoI4Q",
  secure: true
});
var app = (0, _express["default"])();
app.use(fileUpload()); //uploadfile
var PORT = process.env.PORT || 8080;

//config cors
(0, _cors["default"])(app);

//config view engine
(0, _viewEngine["default"])(app);

//config body-parser (middleware) -> get data by name from client or params
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );
app.use(_bodyParser["default"].text({
  limit: "200mb"
}));

//config cookie parser
app.use((0, _cookieParser["default"])());

//test connect DB
(0, _connectDB["default"])();

//init web, api routes
(0, _web["default"])(app);
(0, _api["default"])(app);
app.use(function (req, res) {
  return res.send("404 not found");
});
app.listen(PORT, function () {
  console.log("hello " + PORT);
});