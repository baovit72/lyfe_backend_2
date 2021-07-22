const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "activationcodes";

const { User } = require("./User");

const ActivationCode = sequelize.define(
  "ActivationCode",
  {
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    exp: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { tableName }
);
module.exports = { ActivationCode };
