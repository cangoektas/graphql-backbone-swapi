import { PeopleCollection } from "./people-collection";

test("fetches first 10 people by default", async () => {
  const people = new PeopleCollection();
  await fetchCollection(people);

  expect(people.models.map((model) => model.attributes.name)).toEqual([
    "Luke Skywalker",
    "C-3PO",
    "R2-D2",
    "Darth Vader",
    "Leia Organa",
    "Owen Lars",
    "Beru Whitesun lars",
    "R5-D4",
    "Biggs Darklighter",
    "Obi-Wan Kenobi",
  ]);
});

test("supports pagination", async () => {
  const people = new PeopleCollection();
  people.currentPage = 2;
  await fetchCollection(people);

  expect(people.models.map((model) => model.attributes.name)).toEqual([
    "Anakin Skywalker",
    "Wilhuff Tarkin",
    "Chewbacca",
    "Han Solo",
    "Greedo",
    "Jabba Desilijic Tiure",
    "Wedge Antilles",
    "Jek Tono Porkins",
    "Yoda",
    "Palpatine",
  ]);
});

test("remove: false option affects kept items", async () => {
  const people = new PeopleCollection();
  people.currentPage = 1;
  await fetchCollection(people);
  people.currentPage = 2;
  await fetchCollection(people, { remove: false });

  expect(people.models).toHaveLength(20);
});

function fetchCollection(collectionInstance, options?) {
  return new Promise((resolve, reject) =>
    collectionInstance.fetch({ success: resolve, error: reject, ...options })
  );
}
