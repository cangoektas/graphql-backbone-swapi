import fetch from "cross-fetch";

export interface QueryOptions<V> {
  variables?: V;
}

export interface MutationOptions<V> {
  variables?: V;
}

export interface GraphQLClient {
  uri: string | null;
  query: <D = any, V = any>(
    document: string,
    options?: QueryOptions<V>
  ) => Promise<D>;
  mutation: <D = any, V = any>(
    document: string,
    options?: MutationOptions<V>
  ) => Promise<D>;
}

export class Client implements GraphQLClient {
  uri: string;
  query: <D = any, V = any>(
    document: string,
    options?: QueryOptions<V>
  ) => Promise<D>;
  mutation: <D = any, V = any>(
    document: string,
    options?: MutationOptions<V>
  ) => Promise<D>;

  constructor(uri) {
    this.uri = uri;
    this.query = this.executeOperation;
    this.mutation = this.executeOperation;
  }

  executeOperation<D = any, V = any>(
    document: string,
    options: QueryOptions<V> | MutationOptions<V> = {}
  ): Promise<D> {
    return fetch(this.uri, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document,
        variables: options.variables,
      }),
    })
      .then((response) => response.json())
      .then((json) => json.data);
  }
}

export { NoNetworkClient } from "./no-network-client";
export { MockClient } from "./mock-client";
