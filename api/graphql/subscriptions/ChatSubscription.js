const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ChatType } = require("../types/ChatType");
const { withFilter } = require("apollo-server-express");
const id = require("../../services/id.service");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const { User } = require("../../models/User");

const chatSubscription = {
  type: ChatType,
  subscribe: async (_, args, { pubsub, userId }) => {
    console.log("subscription now", pubsub);
    const gId = id().encode((await groupService().getUserGroup(userId)).id);
    console.log("gId", gId);
    return pubsub.asyncIterator("NEW_CHAT_" + gId);
  },
  resolve: async (currentChat, args, context) => {
    const currentObj = currentChat.dataValues;
    const sender = await User.findOne({
      where: { id: currentObj.senderId },
    });
    return {
      ...currentObj,
      image: await media().getMediaUrlById(currentObj.image || 0),
      video: await media().getMediaUrlById(currentObj.video || 0),
      user: JSON.stringify({
        name: sender.name,
        id: sender.id,
        avatar: await media().getMediaUrlById(sender.avatar),
      }),
      createdAt: currentObj.createdAt.toISOString(),
      text: currentObj.text,
      id: currentObj.id,
    };
  },
};

module.exports = { chatSubscription };
