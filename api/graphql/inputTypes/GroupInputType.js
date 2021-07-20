const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const GroupInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  };

  switch (type) {
    case "update":
      allGraphFields = {
        createdAt: {
          type: GraphQLString,
        },
      };
      break;
    case "create":
      allGraphFields = {
        name: {
          type: GraphQLString,
        },
      };
      break;
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
  }

  const groupInputType = new GraphQLInputObjectType({
    name: `GroupInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a GroupInputType",
    fields: allGraphFields,
  });

  return groupInputType;
};

module.exports = { GroupInputType };
