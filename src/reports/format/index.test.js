import {
  findLabel,
  formatTitle,
  formatReference,
  formatTicket,
  formatIndentedTicketRow,
  formatReportSection,
} from "./index";

const issues = [
  {
    issue_number: 1,
    title: "test title",
    labels: [],
    repoName: "test-repo",
  },
  {
    issue_number: 2,
    title: "Epic: another title",
    labels: ["Epic", "other"],
    repoName: "test-repo",
  },
  {
    issue_number: 3,
    title: "yet another title - with a dash",
    labels: ["bug", "something"],
    repoName: "test-repo",
  },
  {
    issue_number: 4,
    title: "Goal: This one is important",
    labels: ["Goal", "something-else", "Epic"],
    repoName: "test-repo",
  },
];

const keyLabels = [
  { label: /^epic$/i, description: "Epic" },
  { label: /^bug$/i, description: "Bug" },
];

describe("Finding and formatting key labels for ticket title prefixes", () => {
  it("should return a label object when it finds a relevant label", () => {
    expect(findLabel(issues[2].labels, keyLabels)).toStrictEqual({
      label: /^bug$/i,
      description: "Bug",
    });
  });
  it("should ignore case when the regex flag '/i' is set", () => {
    expect(findLabel(issues[3].labels, keyLabels)).toStrictEqual({
      label: /^epic$/i,
      description: "Epic",
    });
  });
});

describe("Formatting helpers for reports", () => {
  it("should capitalise issue titles", () => {
    expect(formatTitle(issues[0])).toBe("Test title");
  });
  it("should prefix titles with the highest priority key label", () => {
    expect(formatTitle(issues[2])).toBe("Bug: Yet another title – with a dash");
  });
  it("should tidy up titles if they've already been prefixed", () => {
    expect(formatTitle(issues[1])).toBe("Epic: Another title");
  });
  it("should appy formatting to prefixes when specified", () => {
    expect(formatTitle(issues[3])).toBe("**Goal:** This one is important");
  });
  it("should format issue references with repo name and ticket number", () => {
    expect(formatReference(issues[0])).toBe("test-repo #1");
  });
  it("should format ticket info with name, repo and number", () => {
    expect(formatTicket(issues[0])).toBe("Test title (test-repo #1)");
  });
  it("should format indented ticket rows on a new line with an asterisk", () => {
    expect(formatIndentedTicketRow(issues[0])).toBe(
      "\n  - Test title (test-repo #1)",
    );
  });
});

describe("Report section formatting", () => {
  it("should output each section of a report, with title and ticket list", () => {
    expect(formatReportSection({ reportTitle: "Section title", issues })).toBe(
      `### Section title
  - Test title (test-repo #1)
  - Epic: Another title (test-repo #2)
  - Bug: Yet another title – with a dash (test-repo #3)
  - **Goal:** This one is important (test-repo #4)`,
    );
  });
});
