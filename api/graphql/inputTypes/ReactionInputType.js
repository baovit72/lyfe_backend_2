const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const ReactionInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    feelingId: { type: GraphQLInt },
  };

  switch (type) {
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
  }

  const reactionInputType = new GraphQLInputObjectType({
    name: `ReactionInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a ReactionInputType",
    fields: allGraphFields,
  });

  return reactionInputType;
};

module.exports = { ReactionInputType };
