const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ReactionInputType } = require("../inputTypes");
const { ReactionType } = require("../types");
const { Chat, Reaction } = require("../../models");
const groupService = require("../../services/group.service");
const id = require("../../services/id.service");

const sendReaction = {
  type: ReactionType,
  args: {
    reaction: {
      name: "reaction",
      type: ReactionInputType("create"),
    },
  },
  resolve: async (_, { reaction }, { pubsub, userId }) => {
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("User's not in any group");
    const foundReaction = await Reaction.findOne({
      where: { senderId: userId, feelingId: reaction.feelingId },
    });
    if (foundReaction) throw new Error("User did react this post");
    const createdReaction = Reaction.create({
      ...reaction,
      senderId: userId,
    });
    pubsub.publish("NEW_REACTION_" + id().encode(group.id), {
      id: await Reaction.count(),
      createdAt: new Date(),
      senderId: userId,
      feelingId: reaction.feelingId,
    });

    return createdReaction;
  },
};

module.exports = { sendReaction };
