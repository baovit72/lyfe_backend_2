const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { SwipeType } = require("../types");
const { withFilter } = require("apollo-server-express");
const id = require("../../services/id.service");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const { User } = require("../../models/User");

const swipeSubscription = {
  type: SwipeType,
  subscribe: async (_, args, { pubsub, userId }) => {
    console.log("subscription now", pubsub);
    const gId = id().encode((await groupService().getUserGroup(userId)).id);
    return pubsub.asyncIterator("NEW_SWIPE_" + gId);
  },
  resolve: (_, args, context) => {
    return _;
  },
};

module.exports = { swipeSubscription };
