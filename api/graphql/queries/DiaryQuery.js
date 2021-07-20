const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { DiaryType } = require("../types");
const { Group, User, GroupDetail, Chat, DiaryItem } = require("../../models");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const id = require("../../services/id.service");

const diaryQuery = {
  type: new GraphQLList(DiaryType),

  resolve: async (group, args, { userId }) => {
    if (!userId) throw new Error("No user id found");
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("No user associated with id");
    const foundgroup = await groupService().getUserGroup(userId);
    if (!foundgroup) throw new Error("No group associated with id");
    const diarys = await DiaryItem.findAll({
      where: { groupId: foundgroup.id },
    });
    const renderedDiarys = [];
    for (let i = 0; i < diarys.length; i++) {
      const currentDiary = diarys[i];
      const sender = await User.findByPk(currentDiary.userId);
      const renderedDiary = {
        ...currentDiary,
        image: await media().getMediaUrlById(currentDiary.image),
        user: JSON.stringify({
          name: sender.name,
          id: userId,
          avatar: await media().getMediaUrlById(sender.avatar),
        }),
        createdAt: currentDiary.createdAt.toISOString(),
        description: currentDiary.description,
        id: currentDiary.id,
      };
      renderedDiarys.push(renderedDiary);
    }
    return renderedDiarys;
  },
};

module.exports = { diaryQuery };
