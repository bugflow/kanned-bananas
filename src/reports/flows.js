import { capitalize } from "../util";

const flows = function gatherFlows({ time, issues }) {
  const flowTypes = [
    {
      from: [
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
      to: ["Product Backlog", "Sprint Backlog", "In Progress"],
      description: "Scope increase",
    },
    {
      from: ["Product Backlog", "Sprint Backlog"],
      to: ["In Progress"],
      description: "Started",
    },
    {
      from: ["Product Backlog", "Sprint Backlog", "In Progress"],
      to: ["Review/QA"],
      description: "Developed",
    },
    {
      from: [
        "New Issues",
        "Icebox",
        "Product Backlog",
        "Sprint Backlog",
        "In Progress",
        "Review/QA",
        "Done",
      ],
      to: ["Failed QA"],
      description: "Rejected",
    },
    { from: ["Failed QA"], to: ["Review/QA"], description: "Fixed" },
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
            // TODO (dormerod): review cases where we might not mind duplicates
            // push the issue to flowEvents unless it's already there
            if (
              !flowEvents[foundType.description].some(
                item => item.issue_number === issue.issue_number,
              )
            ) {
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

  let doneReport = "Tickets completed:";
  flowEvents.Completed.forEach(issue => {
    if (issue.title) {
      doneReport = `${doneReport}
  * ${capitalize(issue.title)}`;
    }
  });

  const reports = {
    summaryReport,
    doneReport,
  };

  return reports;
};

export { flows };
