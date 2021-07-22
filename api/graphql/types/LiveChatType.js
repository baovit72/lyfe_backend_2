const { User } = require("../../models/User");
const media = require("../../services/media.service");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const LiveChatType = new GraphQLObjectType({
  name: "LiveChatType",
  description: "This represents a LiveChat",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (comment) => comment.id,
    },
    content: { type: GraphQLString, resolve: (comment) => comment.content },

    sender: {
      type: GraphQLString,
      resolve: async (comment) => {
        const sender = await User.findByPk(comment.senderId);
        return JSON.stringify({
          name: sender.name,
          id: sender.id,
          avatar: await media().getMediaUrlById(sender.avatar),
        });
      },
    },

    createdAt: {
      type: GraphQLString,
      resolve: (comment) => comment.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (comment) => comment.updatedAt,
    },
  }),
});

module.exports = { LiveChatType };
