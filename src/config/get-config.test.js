import getConfig from "./get-config";

const testConfigFile = "./src/config/test.config.json";
const cliConfig = { title: "New Title!" };
const config = getConfig(testConfigFile, cliConfig);
const project = config.projects[0];

describe("Combine config file with command line settings and defaults", () => {
  it("should override other values with any values from the CLI args", () => {
    expect(project.title).toBe("New Title!");
  });
  it("should use project level config if CLI doesn't override it", () => {
    expect(project.fromTimestamp).toBe("19000101T12:00:00");
  });
  it("should check top level of config file there's nothing project specific", () => {
    expect(project.period).toBe("fortnight");
  });
  it("should use defaults if no other value is specified", () => {
    expect(project.excludedLabels).toStrictEqual([
      "/^duplicate$/",
      "/^exclude$/",
      "/^ignore$/",
      "/^overtaken$/",
    ]);
  });
});
