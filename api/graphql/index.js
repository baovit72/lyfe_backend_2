const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { userQuery } = require("./queries");
const { groupQuery } = require("./queries");
const { feelingQuery } = require("./queries");
const { chatQuery } = require("./queries");
const { updateUser, deleteUser } = require("./mutations");
const { noteQuery } = require("./queries");
const { createNote, updateNote, deleteNote } = require("./mutations");
const { createGroup, updateGroup } = require("./mutations");
const { joinGroup, leaveGroup } = require("./mutations");
const { sendChat } = require("./mutations");
const { sendFeeling } = require("./mutations");
const { createDiary } = require("./mutations");

const { feelingSubscription } = require("./subscriptions");
const { diarySubscription } = require("./subscriptions");
const { chatSubscription } = require("./subscriptions");

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  description:
    "This is the root query which holds all possible READ entrypoints for the GraphQL API",
  fields: () => ({
    user: userQuery,
    note: noteQuery,
    group: groupQuery,
    chat: chatQuery,
    feeling: feelingQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "rootMutation",
  description:
    "This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API",
  fields: () => ({
    updateUser,
    deleteUser,
    createNote,
    updateNote,
    deleteNote,
    createGroup,
    updateGroup,
    joinGroup,
    leaveGroup,
    sendFeeling,
    sendChat,
    createDiary,
  }),
});

const RootSubscription = new GraphQLObjectType({
  name: "rootSubscription",
  description:
    "This is the root subscription which holds all possible SUBSCRIBE entrypoints for the GraphQL API",
  fields: () => ({
    chatSubscription,
    diarySubscription,
    feelingSubscription,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription,
});

module.exports = { schema };
