const { User } = require("../../models/User");
const media = require("../../services/media.service");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const SwipeType = new GraphQLObjectType({
  name: "SwipeType",
  description: "This represents a LiveChat",
  fields: () => ({
    index: {
      type: GraphQLInt,
      resolve: (swipe) => swipe.index,
    },
  }),
});

module.exports = { SwipeType };
