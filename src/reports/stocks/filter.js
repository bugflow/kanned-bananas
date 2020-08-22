import { formatReportSection } from "../format";

function reportByColumn({ reportTitle, columnName, issues }) {
  const filteredIssues = issues.filter(issue => issue.column === columnName);
  let report;

  if (filteredIssues.length > 0) {
    report = formatReportSection({ reportTitle, issues: filteredIssues });
  } else {
    // there were no issues in this column, so don't report on this section
    report = "";
  }

  return report;
}

export { reportByColumn };
