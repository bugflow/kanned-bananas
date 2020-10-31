import testData from "./label-filter.test.json";
import { makeLabelFilter } from "./label-filter";

describe("Include issues by label", () => {
  it("should be able to include using a single label/regex", () => {
    const includedLabels = [/^epic$/i];
    const excludedLabels = [];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue => issue.is_epic);
    expect(issues).toHaveLength(1);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
  it("should be able to include using parts of label text (e.g. prefix)", () => {
    const includedLabels = [/^\$project/];
    const excludedLabels = [];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [2, 4, 4, 6, 7].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(5);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
  it("should include an array of label regexes like an AND operator", () => {
    const includedLabels = [/^\$project-satellite$/, /^duplicate$/];
    const excludedLabels = [];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(
      issue => issue.issue_number === 6,
    );
    expect(issues).toHaveLength(1);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
  it("should also allow an OR operator using regex to include labels", () => {
    const includedLabels = [/^(blocked|bug)$/];
    const excludedLabels = [];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [5, 7, 8].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(3);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
  it("should filter out issues that don't have any labels", () => {
    const includedLabels = [/.*/];
    const excludedLabels = [];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [1, 2, 3, 4, 5, 6, 7, 8].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(8);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
});

describe("Exclude issues by label", () => {
  it("should be able to exclude using a single label/regex", () => {
    const includedLabels = [];
    const excludedLabels = [/^duplicate$/];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [1, 2, 3, 4, 5, 7, 9].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(7);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
  it("should exclude an array of label regexes like an OR operator", () => {
    const includedLabels = [];
    const excludedLabels = [/^duplicate$/, /^overtaken$/];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [2, 3, 4, 5, 7, 9].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(6);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
  it("should not exclude issues that don't have any labels", () => {
    const includedLabels = [];
    const excludedLabels = [/.*/];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [9].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(1);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
});

describe("Include and exclude issues by label", () => {
  it("should be able to include and exclude simultaneously", () => {
    const includedLabels = [/^\$sustainment/, /^bug$/];
    const excludedLabels = [/^duplicate$/, /^overtaken$/];
    const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
    const issues = testData.zenhubIssues.filter(filterByLabel);
    const expectedIssues = testData.zenhubIssues.filter(issue =>
      [5].includes(issue.issue_number),
    );
    expect(issues).toHaveLength(1);
    expect(issues).toEqual(expect.arrayContaining(expectedIssues));
  });
});