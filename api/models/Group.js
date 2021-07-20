const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "groups";

const { User } = require("./User");
const hooks = {
  beforeCreate(group) {
    group.startDate = new Date(); // eslint-disable-line no-param-reassign
  },
};
const Group = sequelize.define(
  "Group",
  {
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      default: new Date(),
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User, // 'Movies' would also work
        key: "id",
      },
    },
  },
  { tableName, hooks }
);
module.exports = { Group };
