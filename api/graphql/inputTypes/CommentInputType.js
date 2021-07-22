const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const CommentInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    content: { type: GraphQLString },
    feelingId: { type: GraphQLInt },
  };

  switch (type) {
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
  }

  const commentInputType = new GraphQLInputObjectType({
    name: `CommentInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a CommentInputType",
    fields: allGraphFields,
  });

  return commentInputType;
};

module.exports = { CommentInputType };
