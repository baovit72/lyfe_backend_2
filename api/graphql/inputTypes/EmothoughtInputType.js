const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const EmothoughtInputType = (type) => {
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

  const emothoughtInputType = new GraphQLInputObjectType({
    name: `EmothoughtInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a EmothoughtInputType",
    fields: allGraphFields,
  });

  return groupDetailInputType;
};

module.exports = { EmothoughtInputType };
