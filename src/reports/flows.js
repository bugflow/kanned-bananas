const flows = function gatherFlows({ issues }) {
  const flowTypes = [
    {
      start: [
        "Product Backlog",
        "Sprint Backlog",
        "Failed QA",
        "In Progress",
        "Review/QA",
      ],
      end: ["New Issues", "Icebox"],
      description: "Scope decrease",
    },
    {
      start: ["New Issues", "Icebox"],
      end: ["Product Backlog", "Sprint Backlog", "In Progress"],
      description: "Scope increase",
    },
    {
      start: ["Product Backlog", "Sprint Backlog"],
      end: ["In Progress"],
      description: "Started",
    },
    {
      start: ["Product Backlog", "Sprint Backlog", "In Progress"],
      end: ["Review/QA"],
      description: "Developed",
    },
    {
      start: [
        "New Issues",
        "Icebox",
        "Product Backlog",
        "Sprint Backlog",
        "In Progress",
        "Review/QA",
        "Done",
      ],
      end: ["Failed QA"],
      description: "Rejected",
    },
    { start: ["Failed QA"], end: ["Review/QA"], description: "Fixed" },
    {
      start: [],
      end: ["Done", "Closed"],
      description: "Completed",
    },
  ];

  const flowEvents = { Other: [] };
  flowTypes.forEach(type => {
    const key = type.description;
    flowEvents[key] = [];
  });

  issues.forEach(issue => {
    issue.events.forEach(event => {
      if (event.type === "transferIssue") {
        if (event && event.to_pipeline && event.to_pipeline.name) {
          const foundType = flowTypes.find(type => {
            if (
              type.end.includes(event.to_pipeline.name) &&
              (type.start.length === 0 ||
                type.start.includes(event.from_pipeline.name))
            ) {
              return true;
            }
            return false;
          });
          if (foundType) flowEvents[foundType.description].push(issue);
        }
      }
    });
  });

  let summaryReport = "Summary:";
  Object.entries(flowEvents).forEach(([event, eventIssues]) => {
    let summary = "";
    if (eventIssues.length > 0) summary = `\n  ${event}: ${eventIssues.length}`;
    summaryReport += summary;
  });

  let doneReport = "Done:";
  flowEvents.Completed.forEach(issue => {
    doneReport = `${doneReport}
  * ${issue.title}`;
  });

  const reports = {
    summaryReport,
    doneReport,
  };

  return reports;
};

export { flows }; // eslint-disable-line import/prefer-default-export
