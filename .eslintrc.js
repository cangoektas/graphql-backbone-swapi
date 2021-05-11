require("ts-node/register");
const { printSchema } = require("graphql");
const { schema } = require("./src/schema/index.ts");

const schemaString = printSchema(schema);

module.exports = {
  parser: "@typescript-eslint/parser",
  env: { es2021: true },
  rules: {
    "graphql/template-strings": ["error", { env: "apollo", schemaString }],
    "graphql/named-operations": ["error", { schemaString }],
    "graphql/no-deprecated-fields": ["warn", { env: "apollo", schemaString }],
  },
  plugins: ["@typescript-eslint", "graphql"],
};
