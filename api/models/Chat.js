const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { Media } = require("./Media");
const { User } = require("./User");
const { Group } = require("./Group");

const tableName = "chats";

const Chat = sequelize.define(
  "Chat",
  {
    text: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Media,
        key: "id",
      },
    },
    video: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Media,
        key: "id",
      },
    },
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
  },
  { tableName }
);
module.exports = { Chat };
