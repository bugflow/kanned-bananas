import { formatReportSection } from "../format";

const flows = function gatherFlows({ time, issues }) {
  const flowTypes = [
    {
      from: [
        "Backlog",
        "Product Backlog",
        "Sprint Backlog",
        "Failed QA",
        "In Progress",
        "Review/QA",
      ],
      to: ["New Issues", "Icebox"],
      description: "Scope decrease",
    },
    {
      from: ["New Issues", "Icebox"],
      to: ["Backlog", "Product Backlog", "Sprint Backlog", "In Progress"],
      description: "Scope increase",
    },
    {
      from: ["Backlog", "Product Backlog", "Sprint Backlog"],
      to: ["In Progress"],
      description: "Started",
    },
    {
      from: ["Backlog", "Product Backlog", "Sprint Backlog", "In Progress"],
      to: ["Review/QA"],
      description: "Developed",
    },
    {
      from: [
        "New Issues",
        "Icebox",
        "Backlog",
        "Product Backlog",
        "Sprint Backlog",
        "In Progress",
        "Review/QA",
        "Done",
      ],
      to: ["Failed QA"],
      description: "Rejected",
    },
    {
      from: ["Failed QA"],
      to: ["In Progress", "Review/QA"],
      description: "Fixed",
    },
    {
      from: [],
      to: ["Done", "Closed"],
      description: "Completed",
    },
  ];

  const flowEvents = { Other: [] };
  // populate flowEvents with event keys and arrays, ready to push events to
  flowTypes.forEach(type => {
    const key = type.description;
    flowEvents[key] = [];
  });

  issues.forEach(issue => {
    issue.events.forEach(event => {
      if (
        event &&
        event.type === "transferIssue" && // event is a flow between columns
        time.inRange(event.created_at) // event is in the reporting timeframe
      ) {
        if (event.to_pipeline && event.to_pipeline.name) {
          const foundType = flowTypes.find(type => {
            if (
              type.to.includes(event.to_pipeline.name) &&
              (type.from.length === 0 || // treat empty 'from' array as wildcard
                type.from.includes(event.from_pipeline.name))
            ) {
              return true;
            }
            return false;
          });
          if (foundType) {
            // guard against data saying a ticket was completed more than once
            if (
              foundType.description === "Completed" &&
              flowEvents[foundType.description].some(
                item => item.issue_number === issue.issue_number,
              )
            ) {
              // don't push the issue, because it was already marked completed
            } else {
              flowEvents[foundType.description].push(issue);
            }
          }
        }
      }
    });
  });

  let summaryReport = "Summary (number of tickets):";
  Object.entries(flowEvents).forEach(([event, eventIssues]) => {
    let summary = "";
    if (eventIssues.length > 0) summary = `\n  ${event}: ${eventIssues.length}`;
    summaryReport += summary;
  });

  const doneReport = formatReportSection({
    reportTitle: "Tickets completed",
    issues: flowEvents.Completed,
  });

  const reports = {
    summaryReport,
    doneReport,
  };

  return reports;
};

export { flows };
