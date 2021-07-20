"use strict";

const bcryptService = require("../api/services/bcrypt.service");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("medias", [
      {
        type: "image",
        filename: "00f072226c895fd86368a3ba57704a92",
        alt: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "test_user_1",
          name: "Padraig Adam",
          password: bcryptService().password({ password: "testpassword" }),
          email: "nguyenbaont2212@gmail.com",
          phone: "0855765343",
          avatar: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_2",
          name: "Jayne Lowry",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail2@gmail.com",
          phone: "0855765344",
          avatar: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_3",
          name: "Muhammed Whittington",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail3@gmail.com",
          phone: "0855765345",
          avatar: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_4",
          name: "Aiza Savage",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail4@gmail.com",
          phone: "0855765346",
          avatar: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_5",
          name: "Vinny Campos",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail5@gmail.com",
          phone: "0855765347",
          avatar: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
