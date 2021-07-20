const Sequelize = require("sequelize");
const bcryptSevice = require("../services/bcrypt.service");

const sequelize = require("../../config/database");
const { Group } = require("./Group");
const { User } = require("./User");

const tableName = "groupdetails";

const hooks = {
  beforeCreate(groupdetail) {
    groupdetail.active = true; // eslint-disable-line no-param-reassign
  },
};
const GroupDetail = sequelize.define(
  "GroupDetail",
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User, // 'Movies' would also work
        key: "id",
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Group, // 'Movies' would also work
        key: "id",
      },
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  },
  { tableName, hooks }
);

module.exports = { GroupDetail };
