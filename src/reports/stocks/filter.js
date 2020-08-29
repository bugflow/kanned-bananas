import { formatReportSection } from "../format";

function summariseByColumn(description, columns, issues) {
  const filteredIssues = issues.filter(issue => columns.includes(issue.column));

  const summary = `${description}: ${filteredIssues.length}`;

  return summary;
}

function reportByColumn({ reportTitle, columns, issues }) {
  const filteredIssues = issues.filter(issue => columns.includes(issue.column));
  let report;

  if (filteredIssues.length > 0) {
    report = formatReportSection({ reportTitle, issues: filteredIssues });
  } else {
    // there were no issues in this column, so don't report on this section
    report = "";
  }

  return report;
}

export { summariseByColumn, reportByColumn };
