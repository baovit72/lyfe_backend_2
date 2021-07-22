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
      {
        type: "image",
        filename: "eef4c562764f0a5693c7db0d36b69e11",
        alt: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "image",
        filename: "71aa2e7ed01b39fee882c89f0c9b8a6e",
        alt: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "image",
        filename: "0154c9e0418bcf7a7db57956aefdaa0d",
        alt: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "image",
        filename: "93aed5050166d2853cd54ef483b5c4df",
        alt: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "image",
        filename: "ee63c71a5c6af9822cee740b8b3a9825",
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
          avatar: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          birthday: new Date(),
        },
        {
          username: "test_user_2",
          name: "Jayne Lowry",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail2@gmail.com",
          phone: "0855765344",
          avatar: 3,
          createdAt: new Date(),
          birthday: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_3",
          name: "Muhammed Whittington",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail3@gmail.com",
          phone: "0855765345",
          avatar: 4,
          createdAt: new Date(),
          birthday: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_4",
          name: "Aiza Savage",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail4@gmail.com",
          phone: "0855765346",
          avatar: 5,
          createdAt: new Date(),
          birthday: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "test_user_5",
          name: "Vinny Campos",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail5@gmail.com",
          phone: "0855765347",
          avatar: 6,
          createdAt: new Date(),
          birthday: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert("groups", [
      {
        createdAt: new Date(),
        startDate: new Date(),
        updatedAt: new Date(),
        ownerId: 1,
      },
    ]);
    await queryInterface.bulkInsert("groupdetails", [
      {
        groupId: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 4,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 5,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("feelings", [
      {
        groupId: 1,
        userId: 1,
        emoticonId: "BLUSHING_EMOJI",
        content: "Sample feeling",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 2,
        emoticonId: "BLUSHING_EMOJI",
        content: "Sample feeling",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 3,
        emoticonId: "BLUSHING_EMOJI",
        content: "Sample feeling",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 4,
        emoticonId: "BLUSHING_EMOJI",
        content: "Sample feeling",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 5,
        emoticonId: "BLUSHING_EMOJI",
        content: "Sample feeling",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("comments", [
      {
        feelingId: 1,
        content: "Great! Keep working ",
        senderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("diary", [
      {
        groupId: 1,
        userId: 2,
        image: 2,
        description: "Sample description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 2,
        image: 2,
        description: "Sample description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupId: 1,
        userId: 2,
        image: 2,
        description: "Sample description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
