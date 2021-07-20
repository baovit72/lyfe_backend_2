const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const DiaryInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image: {
      type: new GraphQLNonNull(GraphQLString),
    },
  };

  switch (type) {
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
  }

  const diaryInputType = new GraphQLInputObjectType({
    name: `DiaryInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a DiaryInputType",
    fields: allGraphFields,
  });

  return diaryInputType;
};

module.exports = { DiaryInputType };
