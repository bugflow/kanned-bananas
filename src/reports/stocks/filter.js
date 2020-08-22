import { formatReportSection } from "../format";

function reportByColumn({ reportTitle, columnName, issues }) {
  const filteredIssues = issues.filter(issue => issue.column === columnName);
  const report = formatReportSection({ reportTitle, issues: filteredIssues });

  return report;
}

export { reportByColumn };
