import getColumns from "../../states/columns/getColumns";
import { makeLabelFilter } from "../../states/labels";
import { formatReportSection } from "../format";

function labels(issues) {
  // filter issues to only the relevant columns (e.g. not icebox, new or done)
  const columns = getColumns();
  const relevantColumns = [
    ...columns.allBacklogs,
    ...columns.failed,
    ...columns.wip,
  ];
  const relevantIssues = issues.filter(issue =>
    relevantColumns.includes(issue.column),
  );

  // filter issues to include anything starting with "blocked"
  const filterByLabel = makeLabelFilter({
    includedLabels: [/^blocked/],
    excludedLabels: [],
  });
  const blockedIssues = relevantIssues.filter(filterByLabel);

  const blockedReport = formatReportSection({
    reportTitle: "Currently blocked",
    issues: blockedIssues,
  });

  const reports = {
    blockedReport,
  };

  return reports;
}

export { labels };
