import { stocks } from "../stocks";
import { flows } from "../flows";
import { labels } from "../labels";

function deliveryReport({ time, issues, project }) {
  const {
    summaryReport,
    uatAddedReport,
    overdeliveryReport,
    doneReport,
  } = flows({
    time,
    issues,
  });
  const {
    stockSummary,
    workingReport,
    testingReport,
    uatWaitingReport,
  } = stocks(issues);
  const { blockedReport } = labels(issues);

  let summary = "";

  if (project.title) summary += `# ${project.title} – Delivery Report\n\n`;

  if (project.subtitle) summary += `## ${project.subtitle}\n\n`;

  summary += `**Report generated on:** ${time.today()}

---

`;

  if (blockedReport) {
    summary += `## Requiring your attention

${blockedReport}

---

`;
  }

  if (summaryReport !== "### Summary of work done (number of tickets)") {
    summary += `## Completed

_${time.description()}_

${summaryReport}

`;

    if (uatAddedReport) summary += `${uatAddedReport}\n\n`;

    if (project.overdelivery && overdeliveryReport)
      summary += `${overdeliveryReport}\n\n`;

    if (doneReport) summary += `${doneReport}\n\n`;

    summary += `---

`;
  }

  if (stockSummary !== "### Summary of upcoming work (number of tickets)") {
    summary += `## Next

${stockSummary}

`;
    if (workingReport) summary += `${workingReport}\n\n`;

    if (testingReport) summary += `${testingReport}\n\n`;

    if (uatWaitingReport) summary += `${uatWaitingReport}\n\n`;
  }

  summary = summary.replace(/(\n){3,}/g, "\n\n"); // tidy up newlines

  return summary;
}

export default deliveryReport;
