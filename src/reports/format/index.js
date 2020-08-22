import { capitalize } from "../../util";

function formatTitle({ title }) {
  return capitalize(title);
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

export { formatTitle, formatReference, formatTicket, formatIndentedTicketRow };
