const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { User } = require("./User");
const { Feeling } = require("./Feeling");

const tableName = "comments";

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: Sequelize.STRING,
      allowNull: true,
    },
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
module.exports = { Comment };
