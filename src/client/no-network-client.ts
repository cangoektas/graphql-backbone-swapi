import { graphql } from "graphql";
import { schema } from "../schema";

export interface QueryOptions<V> {
  variables?: V;
}

export interface MutationOptions<V> {
  variables?: V;
}

export interface GraphQLClient {
  uri: string;
  query: <D = any, V = any>(
    document: string,
    options?: QueryOptions<V>
  ) => Promise<D>;
  mutation: <D = any, V = any>(
    document: string,
    options?: MutationOptions<V>
  ) => Promise<D>;
}

export class NoNetworkClient implements GraphQLClient {
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
    return graphql(schema, document, {}, {}, options.variables).then(
      (result) => result.data as D
    );
  }
}
