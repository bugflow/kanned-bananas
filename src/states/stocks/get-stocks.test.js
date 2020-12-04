import getStockTypes from "./get-stocks";

const mockStockTypes = {
  backlog: {
    columns: [
      "Product Backlog",
      "Sprint Planning",
      "Backlog",
      "Sprint Backlog",
    ],
    title: "Backlog",
    description: "To do",
  },
  failed: {
    columns: ["Failed QA"],
    title: "Currently fixing",
    description: "To fix",
  },
  wip: {
    columns: ["In Progress"],
    title: "Currently working on",
    description: "In progress",
  },
  review: {
    columns: ["Review", "Review/QA"],
    title: "Currently testing",
    description: "To test",
  },
};

describe("Flow types and descriptions", () => {
  it("Should know what backlog tickets look like", () => {
    expect(getStockTypes().backlog).toStrictEqual(mockStockTypes.backlog);
  });
  it("Should know what tickets that failed QA look like", () => {
    expect(getStockTypes().failed).toStrictEqual(mockStockTypes.failed);
  });
  it("Should know what tickets that are being worked on look like", () => {
    expect(getStockTypes().wip).toStrictEqual(mockStockTypes.wip);
  });
  it("Should know what tickets that are awaiting review look like", () => {
    expect(getStockTypes().review).toStrictEqual(mockStockTypes.review);
  });
});
