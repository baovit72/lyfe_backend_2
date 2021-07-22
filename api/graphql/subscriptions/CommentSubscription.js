const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { CommentType } = require("../types/CommentType");
const { withFilter } = require("apollo-server-express");
const id = require("../../services/id.service");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const { User } = require("../../models/User");

const commentSubscription = {
  type: CommentType,
  subscribe: async (_, args, { pubsub, userId }) => {
    console.log("subscription now", pubsub);
    const gId = id().encode((await groupService().getUserGroup(userId)).id);
    return pubsub.asyncIterator("NEW_COMMENT_" + gId);
  },
};

module.exports = { commentSubscription };
