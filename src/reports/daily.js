import { stocks } from "./stocks";
import { flows } from "./flows";
import { labels } from "./labels";

function dailySummary({ time, issues, project }) {
  const { summaryReport, uatReport, doneReport } = flows({ time, issues });
  const { stockSummary, workingReport, testingReport } = stocks(issues);
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

${uatReport}

${doneReport}

---

## Next

${stockSummary}

${workingReport}

${testingReport}
`.replace(/(\n){3,}/g, "\n\n"); // tidy up three or more consecutive line breaks

  return summary;
}

export { dailySummary };
