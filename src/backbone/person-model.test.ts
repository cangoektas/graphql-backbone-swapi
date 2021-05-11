import { PersonModel } from "./person-model";

test("fetch() updates attributes", async () => {
  const person = new PersonModel({ id: "starwars:people:1" }, {});
  await fetch(person);

  expect(person.attributes).toMatchObject({
    id: "starwars:people:1",
    name: "Luke Skywalker",
  });
});

function fetch(instance) {
  return new Promise((resolve, reject) =>
    instance.fetch({ success: resolve, error: reject })
  );
}
