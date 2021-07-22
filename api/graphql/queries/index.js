const { noteQuery } = require("./NoteQuery");
const { userQuery } = require("./UserQuery");
const { groupQuery } = require("./GroupQuery");
const { chatQuery } = require("./ChatQuery");
const { feelingQuery } = require("./FeelingQuery");
const { commentQuery } = require("./CommentQuery");
const { diaryQuery } = require("./DiaryQuery");
const { reactionQuery } = require("./ReactionQuery");

module.exports = {
  noteQuery,
  userQuery,
  groupQuery,
  chatQuery,
  feelingQuery,
  reactionQuery,
  commentQuery,
  diaryQuery,
};
