import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { NodeInterface } from "../interfaces/node-interface";

const personType = new GraphQLObjectType({
  name: "Person",
  fields: {
    name: { type: GraphQLString },
    birthYear: { type: GraphQLString, resolve: (person) => person.birth_year },
    eyeColor: { type: GraphQLString, resolve: (person) => person.eye_color },
    gender: { type: GraphQLString },
    hairColor: { type: GraphQLString, resolve: (person) => person.hair_color },
    height: { type: GraphQLInt },
    mass: { type: GraphQLFloat },
    skinColor: { type: GraphQLString, resolve: (person) => person.skin_color },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  interfaces: [NodeInterface],
  isTypeOf: (value: any) => value && value.__typename === "Person",
});

export { personType };
