import { GraphQLID, GraphQLInterfaceType, GraphQLNonNull } from "graphql";

const NodeInterface = new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
});

export { NodeInterface };
