import {
  formatTitle,
  formatReference,
  formatTicket,
  formatIndentedTicketRow,
  formatReportSection,
} from "./index";

const issues = [
  { title: "test title", repoName: "test-repo", issue_number: 1 },
  { title: "another title", repoName: "test-repo", issue_number: 2 },
];

describe("Formatting helpers for reports", () => {
  it("should capitalise issue titles", () => {
    expect(formatTitle(issues[0])).toBe("Test title");
  });
  it("should format issue references with repo name and ticket number", () => {
    expect(formatReference(issues[0])).toBe("test-repo #1");
  });
  it("should format ticket info with name, repo and number", () => {
    expect(formatTicket(issues[0])).toBe("Test title (test-repo #1)");
  });
  it("should format indented ticket rows on a new line with an asterisk", () => {
    expect(formatIndentedTicketRow(issues[0])).toBe(
      "\n  * Test title (test-repo #1)",
    );
  });
});

describe("Report section formatting", () => {
  it("should output each section of a report, with title and ticket list", () => {
    expect(formatReportSection({ reportTitle: "Section title", issues })).toBe(
      `### Section title
  * Test title (test-repo #1)
  * Another title (test-repo #2)`,
    );
  });
});
