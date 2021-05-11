import * as Backbone from "backbone";
import { URN } from "../urn";

class PersonModel extends Backbone.Model {
  id: string;

  // @ts-ignore
  url() {
    const urn = new URN(this.id);

    return "https://swapi.dev/api/people/" + urn.identifier;
  }

  parse(response) {
    return {
      ...response,
      id: this.id,
      __typename: "Person",
    };
  }
}

export { PersonModel };
