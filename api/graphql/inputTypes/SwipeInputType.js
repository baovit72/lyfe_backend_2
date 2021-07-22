const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const SwipeInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    index: { type: GraphQLInt },
  };

  switch (type) {
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
  }

  const swipeInputType = new GraphQLInputObjectType({
    name: `SwipeInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a SwipeInputType",
    fields: allGraphFields,
  });

  return swipeInputType;
};

module.exports = { SwipeInputType };
