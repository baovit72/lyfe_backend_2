const { User } = require("../../models/User");
const media = require("../../services/media.service");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  description: "This represents a Comment",
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
    feelingId: {
      type: GraphQLInt,
      resolve: (comment) => comment.feelingId, //id, avt, username, name
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

module.exports = { CommentType };
