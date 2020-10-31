import { stocks } from "./stocks";
import { flows } from "./flows";
import { labels } from "./labels";

function dailySummary({ time, issues }) {
  const { summaryReport, uatReport, doneReport } = flows({ time, issues });
  const { stockSummary, workingReport, testingReport } = stocks(issues);
  const { blockedReport } = labels(issues);

  const summary = `
${time.description()}

${summaryReport}

${uatReport}

${doneReport}

${blockedReport}

${stockSummary}

${workingReport}

${testingReport}
`.replace(/(\n){3,}/g, "\n\n"); // tidy up three or more consecutive line breaks

  return summary;
}

export { dailySummary };
