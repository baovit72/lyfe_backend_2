const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const FeelingInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    emoticon: {
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

  const feelingInputType = new GraphQLInputObjectType({
    name: `FeelingInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a FeelingInputType",
    fields: allGraphFields,
  });

  return feelingInputType;
};

module.exports = { FeelingInputType };
