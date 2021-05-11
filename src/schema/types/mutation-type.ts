import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { personInputType } from "./person-input-type";
import { PersonModel } from "../../backbone/person-model";
import { personType } from "./person-type";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updatePerson: {
      type: personType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        input: { type: GraphQLNonNull(personInputType) },
      },
      resolve: (_, { id, input }) => {
        const person = new PersonModel({ id });

        return fetch(person)
          .then(() => person.set(input))
          .then(() => person.attributes);
      },
    },
  },
});

function fetch(modelInstance) {
  return new Promise((resolve, reject) =>
    modelInstance.fetch({ success: resolve, error: reject })
  );
}

export { mutationType };
