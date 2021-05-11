import * as Backbone from "backbone";
import { URN } from "../urn";
import { PersonModel } from "./person-model";

class PeopleCollection extends Backbone.Collection<PersonModel> {
  static totalCount: number = 82;
  static itemsPerPage: number = 10;
  currentPage: number = 1;

  hasNextPage() {
    const lastUrn = new URN(this.models[this.models.length - 1].id);
    const lastId = parseInt(lastUrn.identifier);

    return lastId <= 80;
  }

  hasPreviousPage() {
    const firstUrn = new URN(this.models[0].attributes.id);
    const firstId = parseInt(firstUrn.identifier);

    return firstId >= 11;
  }

  // @ts-ignore
  url() {
    return "https://swapi.dev/api/people/?page=" + this.currentPage;
  }

  parse(response) {
    return response.results.map((result, index) => ({
      ...result,
      id: `starwars:people:${
        (this.currentPage - 1) * PeopleCollection.itemsPerPage + index + 1
      }`,
      __typename: "Person",
    }));
  }
}

export { PeopleCollection };
