const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "resettokens";

const { User } = require("./User");

const ResetToken = sequelize.define(
  "ResetToken",
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    exp: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { tableName }
);
module.exports = { ResetToken };
