import { DocumentNode, isDefinitionNode, parse } from "graphql";
import { GraphQLClient, QueryOptions, MutationOptions } from ".";

export interface MockResolverRequest {
  variables?: Record<string, any>;
}

export type MockResolverResponse = any;

export class MockClient implements GraphQLClient {
  uri: null;
  mocks: Map<string, (request: MockResolverRequest) => MockResolverResponse>;
  query: <D = any, V = any>(
    document: string,
    options?: QueryOptions<V>
  ) => Promise<D>;
  mutation: <D = any, V = any>(
    document: string,
    options?: MutationOptions<V>
  ) => Promise<D>;

  constructor(
    mocks: Array<
      [string, (request: MockResolverRequest) => MockResolverResponse]
    >
  ) {
    this.uri = null;
    this.mocks = new Map(mocks);
    this.query = this.executeOperation;
    this.mutation = this.executeOperation;
  }

  executeOperation<D = any, V = any>(
    document: string,
    options: QueryOptions<V> | MutationOptions<V> = {}
  ): Promise<D> {
    const parsedDocument = parse(document);
    const operationName = getOperationName(parsedDocument);
    const resolver = this.mocks.get(operationName);

    return Promise.resolve(resolver(options));
  }
}

function getOperationName(document: DocumentNode): string {
  const operationDefinition = document.definitions.find(
    (defition) => defition.kind === "OperationDefinition"
  );

  return (operationDefinition as any).name.value;
}
