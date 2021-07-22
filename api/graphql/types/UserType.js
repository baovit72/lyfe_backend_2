const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const media = require("../../services/media.service");
const { NoteType } = require("./NoteType");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (user) => user.id,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    phone: {
      type: GraphQLString,
      resolve: (user) => user.phone,
    },
    avatar: {
      type: GraphQLString,
      resolve: async (user) => {
        console.log("user", user.dataValues.avatar);
        return await media().getMediaUrlById(user.dataValues.avatar);
      },
    },
    birthday: {
      type: GraphQLString,
      resolve: (user) => {
        return user.birthday;
      },
    },
    // notes: {
    //   type: new GraphQLList(NoteType),
    //   resolve: (user) => user.getNotes(),
    // },
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

module.exports = { UserType };
