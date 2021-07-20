const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const GroupType = new GraphQLObjectType({
  name: "Group",
  description: "This represents a Group",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (group) => group.id,
    },
    code: {
      type: GraphQLString,
      resolve: (group) => group.code,
    },
    ownerId: {
      type: GraphQLInt,
      resolve: (group) => group.ownerId,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (group) => group.startDate,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (group) => group.updatedAt,
    },
  }),
});

module.exports = { GroupType };
