import { capitalize, tidyString, typeset } from "../../util";
import keyLabels from "./labels";

function findLabel(labels, keyLabelsParam) {
  // find the highest priority (lowest array index) ticket label (if any)
  const foundLabel = keyLabelsParam.find(keyLabel => {
    if (labels.some(label => keyLabel.label.test(label))) return true;

    return false;
  });

  return foundLabel;
}

function formatTitle({ labels, title }) {
  let prefix = "";
  let suffix = tidyString(title);

  const foundLabel = findLabel(labels, keyLabels);

  if (foundLabel) {
    prefix = `${foundLabel.description}:`;

    // if someone already prefixed the ticket title with the label, remove it
    if (suffix.startsWith(prefix)) {
      suffix = suffix.slice(prefix.length).trim();
    }

    // apply any special formatting to the prefix
    switch (foundLabel.format) {
      case "bold":
        prefix = `**${prefix}**`;
        break;

      default:
        break;
    }
  }

  const output = `${prefix} ${capitalize(suffix)}`.trim();

  return typeset(output);
}

/* eslint-disable camelcase */
function formatReference({ repoName, issue_number }) {
  return `${repoName} #${issue_number}`;
}

function formatTicket({ labels, title, repoName, issue_number }) {
  return `${formatTitle({ labels, title })} (${formatReference({
    repoName,
    issue_number,
  })})`;
}

function formatIndentedTicketRow(issue) {
  return `\n  - ${formatTicket(issue)}`;
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

function formatCSV({ issues }) {
  let report = `"unique_id", "repo", "id", "title", "status"`;

  if (issues.length > 0) {
    issues.forEach(issue => {
      if (issue.title) {
        report += `\n"${issue.repoName}#${issue.issue_number}", "${
          issue.repoName
        }", ${issue.issue_number}, "${issue.title
          .replace(/"/g, "'")
          .trim()}", "${issue.column.trim()}"`;
      }
    });
  }

  return report;
}

export {
  findLabel,
  formatTitle,
  formatReference,
  formatTicket,
  formatIndentedTicketRow,
  formatReportSection,
  formatCSV,
};
