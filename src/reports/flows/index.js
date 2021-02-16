import gatherFlowEvents from "../../states/flows/gather-flow-events";
import { formatReportSection } from "../format";

function flows({ time, issues }) {
  const flowEvents = gatherFlowEvents(time, issues);

  let summaryReport = "### Summary of work done (number of tickets)";
  Object.entries(flowEvents).forEach(([event, eventIssues]) => {
    let summary = "";
    if (eventIssues.length > 0)
      summary = `\n  - ${event}: ${eventIssues.length}`;
    summaryReport += summary;
  });

  const uatAddedReport = formatReportSection({
    reportTitle: "Work added to client review/UAT queue",
    issues: flowEvents["Added to review/UAT"],
  });

  const overdeliveryReport = formatReportSection({
    reportTitle: "Work which exceeded the sprint goals",
    issues: flowEvents["Exceeded sprint goals"],
  });

  const doneReport = formatReportSection({
    reportTitle: "Work completed",
    issues: flowEvents.Completed,
  });

  const reports = {
    summaryReport,
    uatAddedReport,
    overdeliveryReport,
    doneReport,
  };

  return reports;
}

export { flows };
