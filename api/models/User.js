const Sequelize = require("sequelize");
const bcryptSevice = require("../services/bcrypt.service");

const sequelize = require("../../config/database");

const { Media } = require("./Media");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice().password(user); // eslint-disable-line no-param-reassign
  },
  beforeUpdate(user) {
    user.password = bcryptSevice().password(user);
  },
};

const tableName = "users";

const User = sequelize.define(
  "User",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    avatar: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Media,
        key: "id",
      },
    },
  },
  { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = { User };
