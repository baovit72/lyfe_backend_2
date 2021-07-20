const merge = require("lodash.merge");

const { GroupType } = require("../types");
const { Group, User, GroupDetail } = require("../../models");
const { GroupDetailInputType } = require("../inputTypes");
const idService = require("../../services/id.service");
const id = require("../../services/id.service");

const joinGroup = {
  type: GroupType,
  description: "The mutation that allows you put user to a group",
  args: {
    group: {
      name: "group",
      type: GroupDetailInputType("create"),
    },
  },
  resolve: async (_, { group }, { userId }) => {
    const foundGroup = await Group.findOne({
      where: { id: idService().decode(group.code) },
    });
    if (!foundGroup) {
      throw new Error(
        `Group with code: ${idService().decode(group.code)} not found!`
      );
    }
    const user = await User.findByPk(userId);

    const groupDetail = await GroupDetail.findOne({
      where: { userId: user.id, active: true },
    });
    if (groupDetail) {
      throw new Error(`User's already in a group`);
    }

    const createdGroupDetail = await GroupDetail.create({
      userId: user.id,
      groupId: foundGroup.id,
    });
    foundGroup.code = id().encode(foundGroup.id);
    return { ...foundGroup, startDate: foundGroup.startDate.toISOString() };
  },
};

const leaveGroup = {
  type: GroupType,
  description: "The mutation that allows you to leave a group ",

  resolve: async (_, { group }, { userId }) => {
    const groupDetail = await GroupDetail.findOne({
      where: { userId, active: true },
    });

    if (!groupDetail) {
      throw new Error(`User's not in this group`);
    }
    return groupDetail.update({
      ...groupDetail,
      active: false,
    });
  },
};

module.exports = {
  leaveGroup,
  joinGroup,
};
