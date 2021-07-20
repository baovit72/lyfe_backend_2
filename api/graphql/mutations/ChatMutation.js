const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ChatInputType } = require("../inputTypes/ChatInputType");
const { ChatType } = require("../types/ChatType");
const { Chat } = require("../../models");
const groupService = require("../../services/group.service");
const id = require("../../services/id.service");

const sendChat = {
  type: ChatType,
  args: {
    chat: {
      name: "chat",
      type: ChatInputType("create"),
    },
  },
  resolve: async (_, { chat }, { pubsub, userId }) => {
    console.log("new chat");
    const group = await groupService().getUserGroup(userId);
    chat.image && (chat.image = +id().decode(chat.image));
    chat.video && (chat.video = +id().decode(chat.video));
    const createdChat = await Chat.create({
      ...chat,
      id: 0,
      groupId: group.id,
      senderId: userId,
    });
    console.log({
      ...createdChat,
      id: await Chat.count(),
    });
    pubsub.publish("NEW_CHAT_" + id().encode(group.id), {
      ...createdChat,
      id: await Chat.count(),
    });
    return createdChat;
  },
};

module.exports = { sendChat };
