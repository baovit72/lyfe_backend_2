const { chatSubscription } = require("./ChatSubscription");
const { diarySubscription } = require("./DiarySubscription");
const { feelingSubscription } = require("./FeelingSubscription");
const { commentSubscription } = require("./CommentSubscription");
const { reactionSubscription } = require("./ReactionSubscription");
const { liveChatSubscription } = require("./LiveChatSubscription");
const { swipeSubscription } = require("./SwipeSubscription");

module.exports = {
  chatSubscription,
  diarySubscription,
  feelingSubscription,
  commentSubscription,
  liveChatSubscription,
  swipeSubscription,
  reactionSubscription,
};
