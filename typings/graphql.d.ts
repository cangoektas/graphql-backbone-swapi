type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type Query = {
  readonly allPeople?: Maybe<PeopleConnection>;
  readonly person?: Maybe<Person>;
  readonly node?: Maybe<Node>;
};

type QueryAllPeopleArgs = {
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
};

type QueryPersonArgs = {
  id: Scalars["ID"];
};

type QueryNodeArgs = {
  id: Scalars["ID"];
};

/** A connection to a list of items. */
type PeopleConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges?: Maybe<ReadonlyArray<Maybe<PeopleEdge>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  readonly totalCount?: Maybe<Scalars["Int"]>;
};

/** Information about pagination in a connection.Information about pagination in a connection. */
type PageInfo = {
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor?: Maybe<Scalars["String"]>;
};

/** An edge in a connection. */
type PeopleEdge = {
  /** The item at the end of the edge */
  readonly node?: Maybe<Person>;
  /** A cursor for use in pagination */
  readonly cursor: Scalars["String"];
};

/** An individual person or character within the Star Wars universe. */
type Person = Node & {
  /** The name of this person. */
  readonly name?: Maybe<Scalars["String"]>;
  /**
   * The birth year of the person, using the in-universe standard of BBY or ABY -
   * Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is
   * a battle that occurs at the end of Star Wars episode IV: A New Hope.
   */
  readonly birthYear?: Maybe<Scalars["String"]>;
  /**
   * The eye color of this person. Will be "unknown" if not known or "n/a" if the
   * person does not have an eye.
   */
  readonly eyeColor?: Maybe<Scalars["String"]>;
  /**
   * The gender of this person. Either "Male", "Female" or "unknown",
   * "n/a" if the person does not have a gender.
   */
  readonly gender?: Maybe<Scalars["String"]>;
  /**
   * The hair color of this person. Will be "unknown" if not known or "n/a" if the
   * person does not have hair.
   */
  readonly hairColor?: Maybe<Scalars["String"]>;
  /** The height of the person in centimeters. */
  readonly height?: Maybe<Scalars["Int"]>;
  /** The mass of the person in kilograms. */
  readonly mass?: Maybe<Scalars["Float"]>;
  /** The skin color of this person. */
  readonly skinColor?: Maybe<Scalars["String"]>;
  /** The ISO 8601 date format of the time that this resource was created. */
  readonly created?: Maybe<Scalars["String"]>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  readonly edited?: Maybe<Scalars["String"]>;
  /** The id of the object. */
  readonly id: Scalars["ID"];
};

/** An object with an ID */
type Node = {
  /** The id of the object. */
  readonly id: Scalars["ID"];
};

type Mutation = {
  readonly updatePerson?: Maybe<Person>;
};

type MutationUpdatePersonArgs = {
  id: Scalars["ID"];
  input: PersonInput;
};

/**
 * The required payload for created a new Person resource or for
 * updating an existing one.
 */
type PersonInput = {
  /** The name of this person. */
  readonly name?: Maybe<Scalars["String"]>;
};

type GetLuke1QueryVariables = Exact<{ [key: string]: never }>;

type GetLuke1Query = {
  readonly person?: Maybe<{
    readonly id: string;
    readonly name?: Maybe<string>;
  }>;
};

type GetLuke2QueryVariables = Exact<{
  id: Scalars["ID"];
}>;

type GetLuke2Query = {
  readonly person?: Maybe<{
    readonly id: string;
    readonly name?: Maybe<string>;
  }>;
};

type GetLuke3QueryVariables = Exact<{ [key: string]: never }>;

type GetLuke3Query = {
  readonly person?: Maybe<{
    readonly id: string;
    readonly name?: Maybe<string>;
  }>;
};

type GetLuke4QueryVariables = Exact<{ [key: string]: never }>;

type GetLuke4Query = {
  readonly person?: Maybe<{
    readonly id: string;
    readonly name?: Maybe<string>;
  }>;
};

type UpdateLukeMutationVariables = Exact<{
  name?: Maybe<Scalars["String"]>;
}>;

type UpdateLukeMutation = {
  readonly updatePerson?: Maybe<{
    readonly id: string;
    readonly name?: Maybe<string>;
  }>;
};

type GetLukeNodeQueryVariables = Exact<{ [key: string]: never }>;

type GetLukeNodeQuery = {
  readonly node?: Maybe<{ readonly id: string; readonly name?: Maybe<string> }>;
};

type GetAllPeopleQueryVariables = Exact<{ [key: string]: never }>;

type GetAllPeopleQuery = {
  readonly allPeople?: Maybe<{
    readonly totalCount?: Maybe<number>;
    readonly edges?: Maybe<
      ReadonlyArray<
        Maybe<{
          readonly cursor: string;
          readonly node?: Maybe<{
            readonly id: string;
            readonly name?: Maybe<string>;
          }>;
        }>
      >
    >;
  }>;
};
