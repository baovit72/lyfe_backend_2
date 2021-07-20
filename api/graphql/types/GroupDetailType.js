const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const GroupDetailType = new GraphQLObjectType({
  name: "GroupDetail",
  description: "This represents a GroupDetail",
  fields: () => ({
    result: {
      type: GraphQLBoolean,
      resolve: (groupDetail) => true,
    },
  }),
});

module.exports = { GroupDetailType };
