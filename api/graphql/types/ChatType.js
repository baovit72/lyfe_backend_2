const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { UserType } = require("./UserType");

const ChatType = new GraphQLObjectType({
  name: "ChatType",
  description: "This represents a Chat",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (chat) => chat.id,
    },
    text: { type: GraphQLString, resolve: (chat) => chat.text },
    image: { type: GraphQLString, resolve: (chat) => chat.image },
    video: { type: GraphQLString, resolve: (chat) => chat.video },
    user: {
      type: GraphQLString,
      resolve: (chat) => chat.user, //id, avt, username, name
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});

module.exports = { ChatType };
