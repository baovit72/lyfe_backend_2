const { User } = require("../../models/User");
const media = require("../../services/media.service");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const ReactionType = new GraphQLObjectType({
  name: "ReactionType",
  description: "This represents a Reaction",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (reaction) => reaction.id,
    },
    sender: {
      type: GraphQLString,
      resolve: async (reaction) => {
        const sender = await User.findByPk(reaction.senderId);
        return JSON.stringify({
          name: sender.name,
          id: sender.id,
          username: sender.username,
          phone: sender.phone,
          email: sender.email,
          avatar: await media().getMediaUrlById(sender.avatar),
        });
      },
    },
    feelingId: {
      type: GraphQLInt,
      resolve: (reaction) => reaction.feelingId, //id, avt, username, name
    },
    createdAt: {
      type: GraphQLString,
      resolve: (reaction) => reaction.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (reaction) => reaction.updatedAt,
    },
  }),
});

module.exports = { ReactionType };
