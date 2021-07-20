const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { ChatType } = require("../types");
const { Group, User, GroupDetail, Chat } = require("../../models");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const id = require("../../services/id.service");

const chatQuery = {
  type: new GraphQLList(ChatType),

  resolve: async (group, args, { userId }) => {
    if (!userId) throw new Error("No user id found");
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("No user associated with id");
    const foundgroup = await groupService().getUserGroup(userId);
    if (!foundgroup) throw new Error("No group associated with id");
    const chats = await Chat.findAll({ where: { groupId: foundgroup.id } });
    const renderedChats = [];
    console.log(chats, chats.length);
    for (let i = 0; i < chats.length; i++) {
      const currentChat = chats[i];
      console.log("i", i);
      const sender = await User.findByPk(currentChat.senderId);
      const renderedChat = {
        ...currentChat,
        image: await media().getMediaUrlById(currentChat.image),
        video: await media().getMediaUrlById(currentChat.video),
        user: JSON.stringify({
          name: sender.name,
          id: userId,
          avatar: await media().getMediaUrlById(sender.avatar),
        }),
        createdAt: currentChat.createdAt.toISOString(),
        text: currentChat.text,
        id: currentChat.id,
      };
      renderedChats.push(renderedChat);
    }
    console.log(renderedChats);
    return renderedChats;
  },
};

module.exports = { chatQuery };
