import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { NodeInterface } from "../interfaces/node-interface";
import { peopleConnectionType } from "./people-connection-type";
import { PersonModel } from "../../backbone/person-model";
import { personType } from "./person-type";
import { URN } from "../../urn";
import { PeopleCollection } from "../../backbone/people-collection";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    allPeople: {
      type: peopleConnectionType,
      args: {
        after: { type: GraphQLString },
        first: { type: GraphQLInt },
        before: { type: GraphQLString },
        last: { type: GraphQLInt },
      },
      resolve: (_, { first, after }) => {
        const people = new PeopleCollection();

        return fetchCollection(people, { first, after }).then((models) => ({
          pageInfo: {
            hasNextPage: people.hasNextPage(),
            hasPreviousPage: people.hasPreviousPage(),
            startCursor: models[0].attributes.id,
            endCursor: models[models.length - 1].attributes.id,
          },
          totalCount: PeopleCollection.totalCount,
          edges: models
            .map((modelInstance) => modelInstance.attributes)
            .map((node) => ({
              node,
              cursor: node.id,
            })),
        }));
      },
    },
    person: {
      type: personType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }) => {
        const person = new PersonModel({ id });

        return fetchModel(person).then(() => person.attributes);
      },
    },
    node: {
      type: NodeInterface,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }) => {
        const urn = new URN(id);

        switch (urn.collection) {
          case "people": {
            const person = new PersonModel({ id });

            return fetchModel(person).then((model) => model.attributes);
          }
          default: {
            return null;
          }
        }
      },
    },
  },
});

function fetchModel(modelInstance: PersonModel): Promise<PersonModel> {
  return new Promise((resolve, reject) =>
    modelInstance.fetch({ success: resolve, error: reject })
  ).then(() => modelInstance);
}

async function fetchCollection(
  collectionInstance: PeopleCollection,
  { first = 10, after = "starwars:people:0" }
): Promise<PersonModel[]> {
  const afterUrn = new URN(after);
  const firstItemId = parseInt(afterUrn.identifier) + 1;
  const startPage = Math.ceil(firstItemId / PeopleCollection.itemsPerPage);
  const endPage = Math.ceil(
    (firstItemId + first) / PeopleCollection.itemsPerPage
  );

  collectionInstance.currentPage = startPage;
  while (collectionInstance.currentPage <= endPage) {
    await new Promise((resolve, reject) =>
      collectionInstance.fetch({
        success: resolve,
        error: reject,
        remove: false,
      })
    );

    collectionInstance.currentPage += 1;
  }

  const firstItemIndex = (firstItemId - 1) % PeopleCollection.itemsPerPage;

  return collectionInstance.models.slice(
    firstItemIndex,
    firstItemIndex + first
  );
}

export { queryType };
