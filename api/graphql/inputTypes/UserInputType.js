const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const UserInputType = (type) => {
  let allGraphFields = {};
  const standardGraphFields = {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  };

  switch (type) {
    case "delete":
      allGraphFields = {
        ...standardGraphFields,
      };
      break;
    case "update":
      allGraphFields = {
        // ...standardGraphFields,
        username: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        phone: {
          type: GraphQLString,
        },
        avatar: {
          type: GraphQLString,
        },
        birthday: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      };
      break;
    default:
      allGraphFields = {
        ...standardGraphFields,
      };
  }

  const userInputType = new GraphQLInputObjectType({
    name: `UserInputType${
      type[0].toUpperCase() + type.slice(1, type.length - 1)
    }`,
    description: "This represents a UserInputType",
    fields: allGraphFields,
  });

  return userInputType;
};

module.exports = { UserInputType };
