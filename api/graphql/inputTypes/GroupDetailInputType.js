const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const GroupDetailInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    code: {
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

  const groupDetailInputType = new GraphQLInputObjectType({
    name: `GroupDetailInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a GroupDetailInputType",
    fields: allGraphFields,
  });

  return groupDetailInputType;
};

module.exports = { GroupDetailInputType };
