const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ReactionType } = require("../types");
const { withFilter } = require("apollo-server-express");
const id = require("../../services/id.service");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const { User } = require("../../models/User");

const reactionSubscription = {
  type: ReactionType,
  subscribe: async (_, args, { pubsub, userId }) => {
    console.log("subscription now", pubsub);
    const gId = id().encode((await groupService().getUserGroup(userId)).id);
    return pubsub.asyncIterator("NEW_REACTION_" + gId);
  },
  resolve: (_, args, context) => {
    return _;
  },
};

module.exports = { reactionSubscription };
