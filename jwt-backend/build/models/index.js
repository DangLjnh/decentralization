"use strict";

require("dotenv").config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var mysql2 = require("mysql2");
var db = {};
var sequelize;
var customizeConfig = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  dialectModule: mysql2,
  logging: false,
  port: process.env.DB_PORT,
  dialectOptions: process.env.DB_SSL === "true" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  timezone: "+07:00",
  define: {
    freezeTableName: true
  }
};
sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, customizeConfig);
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;