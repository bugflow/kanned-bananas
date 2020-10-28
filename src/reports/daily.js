import { stocks } from "./stocks";
import { flows } from "./flows";

function dailySummary({ time, issues }) {
  const { summaryReport, uatReport, doneReport } = flows({ time, issues });
  const { stockSummary, workingReport, testingReport } = stocks(issues);

  const summary = `
${time.description()}

${summaryReport}

${uatReport}

${doneReport}

${stockSummary}

${workingReport}

${testingReport}
`;

  return summary;
}

export { dailySummary };
