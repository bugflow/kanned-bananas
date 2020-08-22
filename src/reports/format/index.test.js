import {
  formatTitle,
  formatReference,
  formatTicket,
  formatIndentedTicketRow,
} from "./index";

const issue = {
  title: "test title",
  repoName: "test-repo",
  issue_number: 42,
};

describe("Formatting helpers for reports", () => {
  it("should capitalise issue titles", () => {
    expect(formatTitle(issue)).toBe("Test title");
  });
  it("should format issue references with repo name and ticket number", () => {
    expect(formatReference(issue)).toBe("test-repo #42");
  });
  it("should format ticket info with name, repo and number", () => {
    expect(formatTicket(issue)).toBe("Test title (test-repo #42)");
  });
  it("should format indented ticket rows on a new line with an asterisk", () => {
    expect(formatIndentedTicketRow(issue)).toBe(
      "\n  * Test title (test-repo #42)",
    );
  });
});
