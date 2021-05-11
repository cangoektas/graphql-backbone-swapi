import { GraphQLInputObjectType, GraphQLString } from "graphql";

const personInputType = new GraphQLInputObjectType({
  name: "PersonInput",
  fields: {
    name: { type: GraphQLString },
  },
});

export { personInputType };
