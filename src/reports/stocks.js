import { formatIndentedTicketRow } from "./format";

// TODO (dormerod): make reports configurable (not just hardcoded "In Progress")
// TODO (dormerod): add logic for emptry columns (i.e. nothing in progress)
const stocks = function reportStocks(issues) {
  const workingIssues = issues.filter(issue => issue.column === "In Progress");
  let workingReport = "Currently working on:";
  workingIssues.forEach(issue => {
    // TODO (dormerod): this if statement hides PRs from report -- fix properly
    if (issue.title) {
      workingReport = `${workingReport}${formatIndentedTicketRow(issue)}`;
    }
  });

  const testingIssues = issues.filter(issue => issue.column === "Review/QA");
  let testingReport = "Currently testing:";
  testingIssues.forEach(issue => {
    if (issue.title) {
      testingReport = `${testingReport}${formatIndentedTicketRow(issue)}`;
    }
  });

  const reports = {
    workingReport,
    testingReport,
  };

  return reports;
};

export { stocks };
