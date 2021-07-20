const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { FeelingInputType } = require("../inputTypes/FeelingInputType");
const groupService = require("../../services/group.service");
const { Feeling } = require("./../../models");
const id = require("../../services/id.service");
const media = require("../../services/media.service");
const { User } = require("../../models/User");
const { FeelingType } = require("../types/FeelingType");
const { Group } = require("../../models/Group");

const sendFeeling = {
  type: FeelingType,
  args: {
    feeling: {
      name: "feeling",
      type: FeelingInputType("create"),
    },
  },
  resolve: async (_, { feeling }, { pubsub, userId }) => {
    console.log("new feeling");
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("User's in no groups");
    console.log("group", group);
    const foundGroup = await Group.findByPk(group.id);
    if (!foundGroup) throw new Error("Group not exists");
    const user = await User.findByPk(userId);
    const createdItem = await Feeling.create({
      userId: userId,
      groupId: group.id,
      content: feeling.content,
      emoticonId: feeling.emoticon,
    });
    pubsub.publish("NEW_FEELING_" + id().encode(group.id), {
      content: createdItem.content,
      emoticonId: createdItem.emoticonId,
      user: JSON.stringify({
        name: user.name,
        avatar: await media().getMediaUrlById(user.avatar),
      }),
    });
    return {
      content: createdItem.content,
      emoticonId: createdItem.emoticonId,
      user: JSON.stringify({
        name: user.name,
        avatar: await media().getMediaUrlById(user.avatar),
      }),
    };
  },
};

module.exports = { sendFeeling };
