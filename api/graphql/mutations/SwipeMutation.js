const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { SwipeInputType } = require("../inputTypes");
const { SwipeType } = require("../types");
const { Chat, Comment } = require("../../models");
const groupService = require("../../services/group.service");
const id = require("../../services/id.service");

const swipe = {
  type: SwipeType,
  args: {
    swipe: {
      name: "swipe",
      type: SwipeInputType("create"),
    },
  },
  resolve: async (_, { swipe }, { pubsub, userId }) => {
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("User's not in any group");
    pubsub.publish("NEW_SWIPE_" + id().encode(group.id), {
      ...swipe,
    });
    return { senderId: userId };
  },
};

module.exports = { swipe };
