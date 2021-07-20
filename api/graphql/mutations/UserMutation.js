const merge = require("lodash.merge");

const { UserType } = require("../types");
const { User } = require("../../models");
const { UserInputType } = require("../inputTypes");
const id = require("../../services/id.service");

const updateUser = {
  type: UserType,
  description: "The mutation that allows you to update an existing User by Id",
  args: {
    user: {
      name: "user",
      type: UserInputType("update"),
    },
  },
  resolve: async (_, { user }, { userId }) => {
    const foundUser = await User.findByPk(userId);
    console.log("find user", foundUser.id);
    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }
    const newValue = {};
    user.name && (newValue.name = user.name);
    user.phone && (newValue.phone = user.phone);
    user.password && (newValue.password = user.password);
    if (user.avatar) {
      newValue.avatar = +id().decode(user.avatar);
    }
    if (user.birthday) {
      newValue.birthday = Date.parse(user.birthday);
    }

    // user.avatar && (newValue.name = user.avatar);
    // user.birthday && (newValue.name = user.birthday);
    const updatedUser = merge(foundUser, newValue);
    console.log(updatedUser);
    return foundUser.update(newValue);
  },
};

const deleteUser = {
  type: UserType,
  description: "The mutation that allows you to delete a existing User by Id",
  args: {
    user: {
      name: "user",
      type: UserInputType("delete"),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    await User.destroy({
      where: {
        id: user.id,
      },
    });

    return foundUser;
  },
};

module.exports = {
  updateUser,
  deleteUser,
};
