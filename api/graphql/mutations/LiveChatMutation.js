const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { LiveChatInputType } = require("../inputTypes");
const { LiveChatType } = require("../types");
const { Chat, Comment } = require("../../models");
const groupService = require("../../services/group.service");
const id = require("../../services/id.service");

const sendLiveChat = {
  type: LiveChatType,
  args: {
    livechat: {
      name: "comment",
      type: LiveChatInputType("create"),
    },
  },
  resolve: async (_, { livechat }, { pubsub, userId }) => {
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("User's not in any group");
    pubsub.publish("NEW_LIVECHAT_" + id().encode(group.id), {
      ...livechat,
      createdAt: new Date(),
      senderId: userId,
    });
    return { senderId: userId };
  },
};

module.exports = { sendLiveChat };
