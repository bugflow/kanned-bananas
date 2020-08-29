function getColumns() {
  // TODO (dormerod): check for user configured column names and apply them
  // maybe change this code to defaultColumns() and make getColumns check config
  const columns = {};

  columns.newIssues = ["New Issues"];
  columns.ice = ["Icebox", "Some Future Sprint"];
  columns.outScope = [...columns.newIssues, ...columns.ice];
  columns.backlog = ["Backlog"];
  columns.product = ["Product Backlog"];
  columns.sprint = ["Sprint Backlog"];
  columns.allBacklogs = [
    ...columns.backlog,
    ...columns.product,
    ...columns.sprint,
  ];
  columns.failed = ["Failed QA"];
  columns.wip = ["In Progress"];
  columns.review = ["Review", "Review/QA"];
  columns.inScope = [
    ...columns.allBacklogs,
    ...columns.failed,
    ...columns.wip,
    ...columns.review,
  ];
  columns.done = ["Done", "Closed"];

  return columns;
}

export default getColumns;
