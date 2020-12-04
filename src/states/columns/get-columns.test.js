import getColumns from "./get-columns";

const mockColumns = {
  newIssues: ["New Issues"],
  ice: ["Icebox", "Some Future Sprint"],
  outScope: ["New Issues", "Icebox", "Some Future Sprint"],
  product: ["Product Backlog"],
  nextSprint: ["Sprint Planning"],
  backlog: ["Backlog"],
  sprint: ["Sprint Backlog"],
  futureBacklogs: ["Product Backlog", "Sprint Planning"],
  currentBacklogs: ["Backlog", "Sprint Backlog"],
  failed: ["Failed QA"],
  wip: ["In Progress"],
  review: ["Review", "Review/QA"],
  inScope: ["Product Backlog", "Sprint Planning", "Backlog", "Sprint Backlog"],
  active: ["Failed QA", "In Progress", "Review", "Review/QA"],
  uat: ["UAT"],
  done: ["Done", "Closed"],
};

describe("Default column definitions and states", () => {
  it("Should know about in/out of scope, backlog, failed, wip, review, done", () => {
    expect(getColumns().newIssues).toStrictEqual(mockColumns.newIssues);
    expect(getColumns().ice).toStrictEqual(mockColumns.ice);
    expect(getColumns().outScope).toStrictEqual(mockColumns.outScope);
    expect(getColumns().product).toStrictEqual(mockColumns.product);
    expect(getColumns().nextSprint).toStrictEqual(mockColumns.nextSprint);
    expect(getColumns().backlog).toStrictEqual(mockColumns.backlog);
    expect(getColumns().sprint).toStrictEqual(mockColumns.sprint);
    expect(getColumns().futureBacklogs).toStrictEqual(
      mockColumns.futureBacklogs,
    );
    expect(getColumns().currentBacklogs).toStrictEqual(
      mockColumns.currentBacklogs,
    );
    expect(getColumns().failed).toStrictEqual(mockColumns.failed);
    expect(getColumns().wip).toStrictEqual(mockColumns.wip);
    expect(getColumns().review).toStrictEqual(mockColumns.review);
    expect(getColumns().inScope).toStrictEqual(mockColumns.inScope);
    expect(getColumns().active).toStrictEqual(mockColumns.active);
    expect(getColumns().uat).toStrictEqual(mockColumns.uat);
    expect(getColumns().done).toStrictEqual(mockColumns.done);
  });
});
