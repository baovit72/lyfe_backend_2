const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { User } = require("./User");
const { Feeling } = require("./Feeling");

const tableName = "reactions";

const Reaction = sequelize.define(
  "Reaction",
  {
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    feelingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Feeling,
        key: "id",
      },
    },
  },
  { tableName }
);
module.exports = { Reaction };
