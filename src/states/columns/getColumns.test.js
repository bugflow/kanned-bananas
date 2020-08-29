import getColumns from "./getColumns";

const mockColumns = {
  newIssues: ["New Issues"],
  ice: ["Icebox", "Some Future Sprint"],
  outScope: ["New Issues", "Icebox", "Some Future Sprint"],
  backlog: ["Backlog"],
  product: ["Product Backlog"],
  sprint: ["Sprint Backlog"],
  allBacklogs: ["Backlog", "Product Backlog", "Sprint Backlog"],
  failed: ["Failed QA"],
  wip: ["In Progress"],
  review: ["Review", "Review/QA"],
  inScope: [
    "Backlog",
    "Product Backlog",
    "Sprint Backlog",
    "Failed QA",
    "In Progress",
    "Review",
    "Review/QA",
  ],
  done: ["Done", "Closed"],
};

describe("Default column definitions and states", () => {
  it("Should know about in/out of scope, backlog, failed, wip, review, done", () => {
    expect(getColumns().newIssues).toStrictEqual(mockColumns.newIssues);
    expect(getColumns().ice).toStrictEqual(mockColumns.ice);
    expect(getColumns().outScope).toStrictEqual(mockColumns.outScope);
    expect(getColumns().backlog).toStrictEqual(mockColumns.backlog);
    expect(getColumns().product).toStrictEqual(mockColumns.product);
    expect(getColumns().sprint).toStrictEqual(mockColumns.sprint);
    expect(getColumns().allBacklogs).toStrictEqual(mockColumns.allBacklogs);
    expect(getColumns().failed).toStrictEqual(mockColumns.failed);
    expect(getColumns().wip).toStrictEqual(mockColumns.wip);
    expect(getColumns().review).toStrictEqual(mockColumns.review);
    expect(getColumns().inScope).toStrictEqual(mockColumns.inScope);
    expect(getColumns().done).toStrictEqual(mockColumns.done);
  });
});
