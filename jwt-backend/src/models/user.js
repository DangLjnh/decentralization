"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Group, { foreignKey: "groupID" });
      User.belongsToMany(models.Project, { through: "Project_User" });
      User.hasMany(models.Post, { foreignKey: "postID" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      address: DataTypes.STRING,
      sex: DataTypes.STRING,
      phone: DataTypes.STRING,
      groupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // remove unique constraint from groupID column
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
