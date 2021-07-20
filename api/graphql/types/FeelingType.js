const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const FeelingType = new GraphQLObjectType({
  name: "FeelingType",
  description: "This represents a Feeling",
  fields: () => ({
    content: {
      type: GraphQLString,
      resolve: (feeling) => feeling.content,
    },
    emoticonId: {
      type: GraphQLString,
      resolve: (feeling) => feeling.emoticonId,
    },
    user: {
      type: GraphQLString,
      resolve: (feeling) => feeling.user,
    },
    id: {
      type: GraphQLInt,
      resolve: (feeling) => feeling.id,
    },
  }),
});

module.exports = { FeelingType };
