import { GraphQLSchema } from "graphql";
import { queryType } from "./types/query-type";
import { mutationType } from "./types/mutation-type";

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export { schema };
