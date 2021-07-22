const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { CommentType } = require("../types");
const { User, Comment } = require("../../models");
const groupService = require("../../services/group.service");
const media = require("../../services/media.service");
const id = require("../../services/id.service");

const commentQuery = {
  type: new GraphQLList(CommentType),
  args: {
    feelingId: {
      name: "feelingId",
      type: GraphQLInt,
    },
  },
  resolve: async (comment, args, { userId }) => {
    if (!userId) throw new Error("No user id found");
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("No user associated with id");
    const foundgroup = await groupService().getUserGroup(userId);
    if (!foundgroup) throw new Error("No group associated with id");
    return Comment.findAll({ where: args });
  },
};

module.exports = { commentQuery };
