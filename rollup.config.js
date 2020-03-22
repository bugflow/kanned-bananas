import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const external = ["axios", "dotenv", "fs", "graphql-request", "luxon", "util"];
const plugins = [
  resolve({
    mainFields: ["module", "main"],
  }),
  babel({
    exclude: "node_modules/**",
  }),
];

export default [
  {
    input: "src/index.js",
    output: [
      // CommonJS (for Node) and ES module (for bundlers)
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    external,
    plugins,
  },
  {
    input: "src/cli.js",
    output: [{ file: pkg.bin.kb, format: "cjs" }],
    external,
    plugins,
  },
];
