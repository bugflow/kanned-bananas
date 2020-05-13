import { stocks } from "./stocks";
import { flows } from "./flows";

const dailySummary = function dailySummaryReport({ time, issues }) {
  const { summaryReport, doneReport } = flows({ time, issues });
  const { workingReport, testingReport } = stocks(issues);

  const summary = `
${time.description()}

${summaryReport}

${doneReport}

${workingReport}

${testingReport}
`;

  return summary;
};

export { dailySummary };
