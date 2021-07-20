const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const ChatInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    text: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
    video: { type: GraphQLString },
  };

  switch (type) {
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
  }

  const chatInputType = new GraphQLInputObjectType({
    name: `ChatInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a ChatInputType",
    fields: allGraphFields,
  });

  return chatInputType;
};

module.exports = { ChatInputType };
