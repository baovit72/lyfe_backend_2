const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { ReactionType } = require("../types");
const { User, Reaction } = require("../../models");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const id = require("../../services/id.service");

const reactionQuery = {
  type: new GraphQLList(ReactionType),
  args: {
    feelingId: {
      name: "feelingId",
      type: GraphQLInt,
    },
  },
  resolve: async (reaction, args, { userId }) => {
    if (!userId) throw new Error("No user id found");
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("No user associated with id");
    const foundgroup = await groupService().getUserGroup(userId);
    if (!foundgroup) throw new Error("No group associated with id");
    return Reaction.findAll({ where: args });
  },
};

module.exports = { reactionQuery };
