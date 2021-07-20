const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ChatType } = require("../types/ChatType");
const { withFilter } = require("apollo-server-express");
const group = require("../../services/group.service");
const id = require("../../services/id.service");
const { FeelingType } = require("../types/FeelingType");

const feelingSubscription = {
  type: FeelingType,
  subscribe: async (_, args, { pubsub, userId }) => {
    console.log("subscription now", pubsub);
    return pubsub.asyncIterator(
      "NEW_FEELING_" + id().encode((await group().getUserGroup(userId)).id)
    );
  },
  resolve: (_, args, context) => {
    return _;
  },
};

module.exports = { feelingSubscription };
