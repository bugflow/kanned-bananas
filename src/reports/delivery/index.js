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

  const summary = `
# ${project.title} – Delivery Report

## ${project.subtitle}

**Report generated on:** ${time.today()}

---

## Requiring your attention

${blockedReport}

---

## Completed

_${time.description()}_

${summaryReport}

${uatAddedReport}

${overdeliveryReport}

${doneReport}

---

## Next

${stockSummary}

${workingReport}

${testingReport}

${uatWaitingReport}
`.replace(/(\n){3,}/g, "\n\n"); // tidy up three or more consecutive line breaks

  return summary;
}

export default deliveryReport;
