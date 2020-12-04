function getColumns() {
  // TODO (dormerod): check for user configured column names and apply them
  // maybe change this code to defaultColumns() and make getColumns check config
  const columns = {};

  columns.newIssues = ["New Issues"];
  columns.ice = ["Icebox", "Some Future Sprint"];
  columns.outScope = [...columns.newIssues, ...columns.ice];
  columns.goals = ["Goals", "Long-term goals", "Short-term goals"];
  columns.product = ["Product Backlog"];
  columns.nextSprint = ["Sprint Planning"];
  columns.backlog = ["Backlog"];
  columns.sprint = ["Sprint Backlog"];
  columns.futureBacklogs = [...columns.product, ...columns.nextSprint];
  columns.currentBacklogs = [...columns.backlog, ...columns.sprint];
  columns.planned = [...columns.goals, ...columns.futureBacklogs];
  columns.inScope = [...columns.planned, ...columns.currentBacklogs];
  columns.failed = ["Failed QA"];
  columns.wip = ["In Progress"];
  columns.review = ["Review", "Review/QA"];
  columns.active = [...columns.failed, ...columns.wip, ...columns.review];
  columns.uat = ["UAT"];
  columns.done = ["Done", "Closed"];

  return columns;
}

export default getColumns;
