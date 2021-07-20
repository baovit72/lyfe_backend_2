const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { DiaryInputType } = require("../inputTypes/DiaryInputType");
const groupService = require("../../services/group.service");
const { DiaryItem } = require("./../../models");
const id = require("../../services/id.service");
const media = require("../../services/media.service");
const { User } = require("../../models/User");
const { DiaryType } = require("../types/DiaryType");
const { Group } = require("../../models/Group");

const createDiary = {
  type: DiaryType,
  args: {
    diary: {
      name: "diary",
      type: DiaryInputType("create"),
    },
  },
  resolve: async (_, { diary }, { pubsub, userId }) => {
    console.log("new diary");
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("User's in no groups");
    console.log("group", group);
    const foundGroup = await Group.findByPk(group.id);
    if (!foundGroup) throw new Error("Group not exists");
    const user = await User.findByPk(userId);
    const createdItem = await DiaryItem.create({
      userId: userId,
      groupId: group.id,
      description: diary.description,
      image: +id().decode(diary.image),
    });
    pubsub.publish("NEW_DIARY_" + id().encode(group.id), {
      description: createdItem.description,
      image: await media().getMediaUrlById(createdItem.image),
      user: JSON.stringify({
        name: user.name,
        avatar: await media().getMediaUrlById(user.avatar),
      }),
    });
    return {
      description: createdItem.description,
      image: await media().getMediaUrlById(createdItem.image),
      user: JSON.stringify({
        name: user.name,
        avatar: await media().getMediaUrlById(user.avatar),
      }),
    };
  },
};

module.exports = { createDiary };
