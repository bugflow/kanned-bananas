import { reportByColumn } from "./filter";

// TODO (dormerod): make reports configurable (not just hardcoded "In Progress")
// TODO (dormerod): add logic for emptry columns (i.e. nothing in progress)
function stocks(issues) {
  const workingReport = reportByColumn({
    reportTitle: "Currently working on",
    columnName: "In Progress",
    issues,
  });

  const testingReport = reportByColumn({
    reportTitle: "Currently testing",
    columnName: "Review/QA",
    issues,
  });

  const reports = {
    workingReport,
    testingReport,
  };

  return reports;
}

export { stocks };
