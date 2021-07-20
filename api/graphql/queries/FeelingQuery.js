const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { FeelingType } = require("../types");
const { Group, User, GroupDetail, Chat, Feeling } = require("../../models");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const id = require("../../services/id.service");

const feelingQuery = {
  type: new GraphQLList(FeelingType),

  resolve: async (group, args, { userId }) => {
    if (!userId) throw new Error("No user id found");
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("No user associated with id");
    const foundgroup = await groupService().getUserGroup(userId);
    if (!foundgroup) throw new Error("No group associated with id");
    const feelings = await Feeling.findAll({
      where: { groupId: foundgroup.id },
      order: [["createdAt", "DESC"]],
    });
    const renderedFeelings = [];
    for (let i = 0; i < feelings.length; i++) {
      const currentFeeling = feelings[i];
      if (
        renderedFeelings.find((r) => {
          return (
            r.groupId == currentFeeling.dataValues.groupId &&
            r.userId == currentFeeling.dataValues.userId
          );
        })
      ) {
        continue;
      }
      console.log(
        renderedFeelings,
        currentFeeling,
        renderedFeelings.find((r) => {
          r.groupId == currentFeeling.groupId &&
            r.userId == currentFeeling.userId;
        })
      );
      const sender = await User.findByPk(currentFeeling.userId);
      const renderedFeeling = {
        content: currentFeeling.content,
        emoticonId: currentFeeling.emoticonId,
        user: JSON.stringify({
          name: sender.name,
          id: userId,
          avatar: await media().getMediaUrlById(sender.avatar),
        }),
        createdAt: currentFeeling.createdAt.toISOString(),
        id: currentFeeling.id,
        groupId: currentFeeling.groupId,
        userId: currentFeeling.userId,
      };

      renderedFeelings.push(renderedFeeling);
    }
    return renderedFeelings;
  },
};

module.exports = { feelingQuery };
