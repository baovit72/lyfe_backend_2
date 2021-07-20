const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { GroupType } = require("../types");
const { Group } = require("../../models");

const groupQuery = {
  type: new GraphQLList(GroupType),
  args: {
    id: {
      name: "id",
      type: GraphQLInt,
    },
    name: {
      name: "name",
      type: GraphQLString,
    },
    code: {
      name: "code",
      type: GraphQLString,
    },
    ownerId: {
      name: "ownerId",
      type: GraphQLInt,
    },
  },
  resolve: (group, args) => Group.findAll({ where: args }),
};

module.exports = { groupQuery };
