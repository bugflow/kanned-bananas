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
`;

  return summary;
}

export { dailySummary };
