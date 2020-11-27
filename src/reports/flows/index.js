import gatherFlowEvents from "../../states/flows/gather-flow-events";
import { formatReportSection } from "../format";

function flows({ time, issues }) {
  const flowEvents = gatherFlowEvents(time, issues);

  let summaryReport = "Summary of work done (number of tickets):";
  Object.entries(flowEvents).forEach(([event, eventIssues]) => {
    let summary = "";
    if (eventIssues.length > 0) summary = `\n  ${event}: ${eventIssues.length}`;
    summaryReport += summary;
  });

  const uatReport = formatReportSection({
    reportTitle: "Work added to UAT queue",
    issues: flowEvents["Added to UAT queue"],
  });

  const doneReport = formatReportSection({
    reportTitle: "Work completed",
    issues: flowEvents.Completed,
  });

  const reports = {
    summaryReport,
    uatReport,
    doneReport,
  };

  return reports;
}

export { flows };
