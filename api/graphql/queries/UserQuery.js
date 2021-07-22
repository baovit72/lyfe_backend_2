const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { GroupDetail } = require("../../models");

const groupService = require("../../services/group.service");

const { UserType } = require("../types");
const { User } = require("../../models");

const userQuery = {
  type: new GraphQLList(UserType),

  resolve: async (user, args, { userId }) => {
    const results = [];
    const group = await groupService().getUserGroup(userId);
    if (!group) throw new Error("No group found");
    const groupDetails = await GroupDetail.findAll({
      where: { groupId: group.id, active: true },
    });
    console.log(groupDetails);
    for (let i = 0; i < groupDetails.length; i++) {
      results.push(
        await User.findOne({ where: { id: groupDetails[i].dataValues.userId } })
      );
    }
    return results;
  },
};

module.exports = { userQuery };
