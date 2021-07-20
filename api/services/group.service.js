const { Group, GroupDetail } = require("./../models");
const idService = require("./id.service");
const groupService = () => {
  return {
    async getUserGroup(uid) {
      const detail = await GroupDetail.findOne({
        where: { userId: uid, active: true },
      });
      if (!detail) return null;
      const group = await Group.findByPk(detail.groupId);
      if (!group) return null;
      return {
        id: group.id,
        createdAt: group.startDate,
        code: idService().encode(group.id),
      };
    },
  };
};
module.exports = groupService;
