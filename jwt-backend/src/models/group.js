"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.User);
      Group.belongsToMany(models.Role, {
        through: "Group_Role",
        foreignKey: "groupID",
      });
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
