import filterByLabel from "./index";

const testIssue = {
  issue_number: 1,
  is_epic: false,
  position: 2,
  column: "Done",
  repoName: "test-repo",
  repoID: "111111111",
  events: [],
  title: "Issue with no label property",
  milestone: "Some future sprint",
};

describe("Label function should compose nicely with other filters", () => {
  it("should include issues with no labels when includedLabels === []", () => {
    const includedLabels = [];
    const excludedLabels = [];

    const result = filterByLabel(testIssue, includedLabels, excludedLabels);

    expect(result).toBe(true);
  });
  it("should exclude issues with no label when includedLabels !== []", () => {
    const includedLabels = ["bug"];
    const excludedLabels = [];

    const result = filterByLabel(testIssue, includedLabels, excludedLabels);

    expect(result).toBe(false);
  });
});
