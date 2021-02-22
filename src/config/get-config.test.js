import getConfig from "./get-config";

const testConfigFile = "./src/config/test.config.json";
const cliConfig = { title: "New Title!" };
const config = getConfig(testConfigFile, cliConfig);
const project = config.projects[0];

describe("Combine config file with command line settings and defaults", () => {
  it("should use defaults if the config doesn't specify a value", () => {
    expect(project.period).toBe("week");
    expect(project.fromTimestamp).toBe("19000101T12:00:00");
    expect(project.excludedLabels).toStrictEqual([
      "/^duplicate$/",
      "/^exclude$/",
      "/^ignore$/",
      "/^overtaken$/",
    ]);
  });
  it("should override other values with any values from the CLI args", () => {
    expect(project.title).toBe("New Title!");
  });
});
