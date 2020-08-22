import { formatReportSection } from "./format";

// TODO (dormerod): make reports configurable (not just hardcoded "In Progress")
// TODO (dormerod): add logic for emptry columns (i.e. nothing in progress)
const stocks = function reportStocks(issues) {
  const workingIssues = issues.filter(issue => issue.column === "In Progress");
  const workingReport = formatReportSection(
    "Currently working on",
    workingIssues,
  );

  const testingIssues = issues.filter(issue => issue.column === "Review/QA");
  const testingReport = formatReportSection(
    "Currently working on",
    testingIssues,
  );

  const reports = {
    workingReport,
    testingReport,
  };

  return reports;
};

export { stocks };
