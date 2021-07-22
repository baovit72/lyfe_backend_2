const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const LiveChatInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    content: { type: GraphQLString },
  };

  switch (type) {
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
  }

  const liveChatInputType = new GraphQLInputObjectType({
    name: `LiveChatInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a LiveChatInputType",
    fields: allGraphFields,
  });

  return liveChatInputType;
};

module.exports = { LiveChatInputType };
