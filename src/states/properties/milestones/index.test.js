import filterByMilestone from "./index";

const testIssue = {
  issue_number: 1,
  is_epic: false,
  position: 2,
  column: "Done",
  repoName: "test-repo",
  repoID: "111111111",
  events: [],
  title: "Issue with no milestone property",
  labels: ["question"],
};

describe("Milestone function should compose nicely with other filters", () => {
  it("should include issues with no milestone when includedMilestones === []", () => {
    const includedMilestones = [];
    const excludedMilestones = [];

    const result = filterByMilestone(
      testIssue,
      includedMilestones,
      excludedMilestones,
    );

    expect(result).toBe(true);
  });
  it("should exclude issues with no milestone when includedMilestones !== []", () => {
    const includedMilestones = ["Some future sprint"];
    const excludedMilestones = [];

    const result = filterByMilestone(
      testIssue,
      includedMilestones,
      excludedMilestones,
    );

    expect(result).toBe(false);
  });
});
