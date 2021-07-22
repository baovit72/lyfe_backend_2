const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { CommentInputType } = require("../inputTypes");
const { CommentType } = require("../types");
const { Chat, Comment } = require("../../models");
const groupService = require("../../services/group.service");
const id = require("../../services/id.service");

const sendComment = {
  type: CommentType,
  args: {
    comment: {
      name: "comment",
      type: CommentInputType("create"),
    },
  },
  resolve: async (_, { comment }, { pubsub, userId }) => {
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("User's not in any group");
    const createdComment = Comment.create({
      ...comment,
      senderId: userId,
    });
    pubsub.publish("NEW_COMMENT_" + id().encode(group.id), {
      id: await Comment.count(),
      ...comment,
      senderId: userId,
      createdAt: new Date(),
    });

    return createdComment;
  },
};

module.exports = { sendComment };
