const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "medias";

const Media = sequelize.define(
  "Media",
  {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alt: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { tableName }
);
module.exports = { Media };
