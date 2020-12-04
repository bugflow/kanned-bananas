import { capitalize, tidyString } from "../../util";

function formatTitle({ title }) {
  return capitalize(tidyString(title));
}

/* eslint-disable camelcase */
function formatReference({ repoName, issue_number }) {
  return `${repoName} #${issue_number}`;
}

function formatTicket({ title, repoName, issue_number }) {
  return `${formatTitle({ title })} (${formatReference({
    repoName,
    issue_number,
  })})`;
}

function formatIndentedTicketRow(issue) {
  return `\n  * ${formatTicket(issue)}`;
}
/* eslint-enable camelcase */

function formatReportSection({ reportTitle, issues }) {
  let report = "";

  if (issues.length > 0) {
    report = `### ${reportTitle}`;
    issues.forEach(issue => {
      // TODO (dormerod): this if statement hides PRs from report -- fix properly
      if (issue.title) {
        report = `${report}${formatIndentedTicketRow(issue)}`;
      }
    });
  }

  return report;
}

export {
  formatTitle,
  formatReference,
  formatTicket,
  formatIndentedTicketRow,
  formatReportSection,
};
