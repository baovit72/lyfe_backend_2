const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const DiaryType = new GraphQLObjectType({
  name: "DiaryType",
  description: "This represents a Diary",
  fields: () => ({
    description: {
      type: GraphQLString,
      resolve: (diary) => diary.description,
    },
    image: {
      type: GraphQLString,
      resolve: (diary) => diary.image,
    },
    user: {
      type: GraphQLString,
      resolve: (diary) => diary.user,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (diary) => diary.createdAt.toISOString(),
    },
    id: { type: GraphQLInt, resolve: (diary) => diary.id },
  }),
});

module.exports = { DiaryType };
