const { createNote, updateNote, deleteNote } = require("./NoteMutation");

const { joinGroup, leaveGroup } = require("./GroupDetailMutation");

const { createGroup, updateGroup } = require("./GroupMutation");
const { sendFeeling } = require("./FeelingMutation");

const { createUser, updateUser, deleteUser } = require("./UserMutation");

const { sendChat } = require("./ChatMutation");
const { createDiary } = require("./DiaryMutation");

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  createUser,
  updateUser,
  createGroup,
  updateGroup,
  deleteUser,
  joinGroup,
  sendChat,
  leaveGroup,
  createDiary,
  sendFeeling,
};
