import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const pageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    hasNextPage: { type: GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: GraphQLNonNull(GraphQLBoolean) },
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString },
  },
});

export { pageInfoType };
