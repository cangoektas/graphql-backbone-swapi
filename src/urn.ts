class URN {
  namespace: string;
  collection: string;
  identifier: string;

  constructor(urn: string) {
    const [namespace, collection, identifier] = urn.split(":");

    this.namespace = namespace;
    this.collection = collection;
    this.identifier = identifier;
  }
}

export { URN };
