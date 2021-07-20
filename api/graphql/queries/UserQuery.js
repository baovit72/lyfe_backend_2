const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { UserType } = require("../types");
const { User } = require("../../models");

const userQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      name: "id",
      type: GraphQLInt,
    },
    username: {
      name: "username",
      type: GraphQLString,
    },
    name: {
      name: "name",
      type: GraphQLString,
    },
    email: {
      name: "email",
      type: GraphQLString,
    },
    phone: {
      name: "phone",
      type: GraphQLString,
    },
    createdAt: {
      name: "createdAt",
      type: GraphQLString,
    },
    updatedAt: {
      name: "updatedAt",
      type: GraphQLString,
    },
  },
  resolve: (user, args) => User.findAll({ where: args }),
};

module.exports = { userQuery };
