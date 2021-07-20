const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

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
      resolve: (user) => {},
    },
    birthday: {
      type: GraphQLString,
      resolve: (user) => {
        user.birthday;
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
