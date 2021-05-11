/**
 * Writes the schema in SDL into a local file for documentation purposes.
 */
import * as fs from "fs";
import * as path from "path";
import { printSchema } from "graphql";
import { format } from "prettier";
import { schema } from "../src/schema";

const outputPath = process.argv[2];

const comment = `###########################################################
# THIS FILE WAS GENERATED FOR DOCUMENTATION PURPOSES ONLY #
# PLEASE DON'T EDIT THIS FILE                             #
###########################################################

`;

fs.writeFileSync(
  path.resolve(process.cwd(), outputPath),
  comment + format(printSchema(schema), { parser: "graphql" }),
  {
    encoding: "utf-8",
  }
);
