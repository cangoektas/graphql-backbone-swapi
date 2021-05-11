import gql from "fake-tag";
import { GraphQLClient } from ".";
import { Client, NoNetworkClient, MockClient } from ".";

describe.each`
  name                 | ClientConstructor
  ${"Client"}          | ${Client}
  ${"NoNetworkClient"} | ${NoNetworkClient}
  ${"MockClient"}      | ${MockClient}
`("$name", ({ name, ClientConstructor }) => {
  let client: GraphQLClient;

  beforeAll(() => {
    switch (name) {
      case "Client": {
        client = new ClientConstructor("http://localhost:4000/graphql");
      }
      case "NoNetworkClient": {
        client = new ClientConstructor();
      }
      case "MockClient": {
        client = new MockClient([
          [
            "getLuke1",
            () => ({
              person: { id: "starwars:people:1", name: "Luke Skywalker" },
            }),
          ],
          [
            "getLuke2",
            (request) => ({
              person: { id: request.variables.id, name: "Luke Skywalker" },
            }),
          ],
          [
            "getLuke3",
            () => ({
              person: { id: "starwars:people:1", name: "Luke Skywalker" },
            }),
          ],
          [
            "getLuke4",
            () => ({
              person: { id: "starwars:people:1", name: "Darth Vader" },
            }),
          ],
          [
            "updateLuke",
            (request) => ({
              person: {
                id: "starwars:people:1",
                name: request.variables.name,
              },
            }),
          ],
          [
            "getLukeNode",
            () => ({
              node: { id: "starwars:people:1", name: "Luke Skywalker" },
            }),
          ],
          [
            "getAllPeople",
            () => ({
              allPeople: {
                totalCount: 10,
                edges: [
                  {
                    node: { id: "starwars:people:1", name: "Luke Skywalker" },
                    cursor: "starwars:people:1",
                  },
                  {
                    node: { id: "starwars:people:2", name: "C-3PO" },
                    cursor: "starwars:people:2",
                  },
                  {
                    node: { id: "starwars:people:3", name: "R2-D2" },
                    cursor: "starwars:people:3",
                  },
                ],
              },
            }),
          ],
        ]);
      }
    }
  });

  it("supports queries", () => {
    return client
      .query<GetLuke1Query>(
        gql`
          query getLuke1 {
            person(id: "starwars:people:1") {
              id
              name
            }
          }
        `
      )
      .then((data) => {
        expect(data).toEqual({
          person: {
            id: "starwars:people:1",
            name: "Luke Skywalker",
          },
        });
      });
  });

  it("supports queries with variables", () => {
    return client
      .query<GetLuke2Query, GetLuke2QueryVariables>(
        gql`
          query getLuke2($id: ID!) {
            person(id: $id) {
              id
              name
            }
          }
        `,
        { variables: { id: "starwars:people:1" } }
      )
      .then((data) => {
        expect(data).toEqual({
          person: {
            id: "starwars:people:1",
            name: "Luke Skywalker",
          },
        });
      });
  });

  it("supports mutations with variables", async () => {
    const GET_LUKE_3 = gql`
      query getLuke3 {
        person(id: "starwars:people:1") {
          id
          name
        }
      }
    `;
    const GET_LUKE_4 = gql`
      query getLuke4 {
        person(id: "starwars:people:1") {
          id
          name
        }
      }
    `;
    let data = await client.query<GetLuke3Query>(GET_LUKE_3);

    expect(data).toEqual({
      person: {
        id: "starwars:people:1",
        name: "Luke Skywalker",
      },
    });

    await client.mutation<UpdateLukeMutation, UpdateLukeMutationVariables>(
      gql`
        mutation updateLuke($name: String) {
          updatePerson(id: "starwars:people:1", input: { name: $name }) {
            id
            name
          }
        }
      `,
      { variables: { name: "Darth Vader" } }
    );

    data = await client.query<GetLuke4Query>(GET_LUKE_4);

    expect(data).toEqual({
      person: {
        id: "starwars:people:1",
        name: "Darth Vader",
      },
    });
  });

  it("supports queriyng nodes by Id", async () => {
    const data = await client.query<GetLukeNodeQuery>(gql`
      query getLukeNode {
        node(id: "starwars:people:1") {
          ... on Person {
            id
            name
          }
        }
      }
    `);

    expect(data).toEqual({
      node: {
        id: "starwars:people:1",
        name: "Luke Skywalker",
      },
    });
  });

  it("supports collections", async () => {
    const data = await client.query<GetAllPeopleQuery>(gql`
      query getAllPeople {
        allPeople(first: 3) {
          totalCount
          edges {
            node {
              id
              name
            }
            cursor
          }
        }
      }
    `);

    expect(data).toEqual({
      allPeople: {
        totalCount: 10,
        edges: [
          {
            node: { id: "starwars:people:1", name: "Luke Skywalker" },
            cursor: "starwars:people:1",
          },
          {
            node: { id: "starwars:people:2", name: "C-3PO" },
            cursor: "starwars:people:2",
          },
          {
            node: { id: "starwars:people:3", name: "R2-D2" },
            cursor: "starwars:people:3",
          },
        ],
      },
    });
  });
});
