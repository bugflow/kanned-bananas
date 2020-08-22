import { stocks } from "./stocks";
import { flows } from "./flows";

function dailySummary({ time, issues }) {
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
}

export { dailySummary };
