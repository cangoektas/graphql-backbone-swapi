import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { pageInfoType } from "./page-info-type";
import { personType } from "./person-type";

const peopleEdgeType = new GraphQLObjectType({
  name: "PeopleEdge",
  fields: {
    node: { type: personType },
    cursor: { type: GraphQLNonNull(GraphQLString) },
  },
});

const peopleConnectionType = new GraphQLObjectType({
  name: "PeopleConnection",
  fields: {
    pageInfo: { type: GraphQLNonNull(pageInfoType) },
    edges: { type: GraphQLList(peopleEdgeType) },
    totalCount: { type: GraphQLInt },
  },
});

export { peopleConnectionType };
