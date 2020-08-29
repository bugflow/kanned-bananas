import getFlowTypes from "./get-flows";

const mockFlowTypes = {
  decrease: {
    type: "decrease",
    from: [
      "Backlog",
      "Product Backlog",
      "Sprint Backlog",
      "Failed QA",
      "In Progress",
      "Review",
      "Review/QA",
    ],
    to: ["New Issues", "Icebox", "Some Future Sprint"],
    description: "Scope decrease",
  },
  increase: {
    type: "increase",
    from: ["New Issues", "Icebox", "Some Future Sprint"],
    to: [
      "Backlog",
      "Product Backlog",
      "Sprint Backlog",
      "Failed QA",
      "In Progress",
      "Review",
      "Review/QA",
    ],
    description: "Scope increase",
  },
  started: {
    type: "started",
    from: ["Backlog", "Product Backlog", "Sprint Backlog"],
    to: ["In Progress"],
    description: "Started",
  },
  developed: {
    type: "developed",
    from: ["Backlog", "Product Backlog", "Sprint Backlog", "In Progress"],
    to: ["Review", "Review/QA"],
    description: "Developed",
  },
  rejected: {
    type: "rejected",
    from: [],
    to: ["Failed QA"],
    description: "Rejected",
  },
  fixed: {
    type: "fixed",
    from: ["Failed QA"],
    to: ["In Progress", "Review", "Review/QA"],
    description: "Fixed",
  },
  completed: {
    type: "completed",
    from: [],
    to: ["Done", "Closed"],
    description: "Completed",
  },
};

describe("Flow types and descriptions", () => {
  it("Should know what a scope decrease looks like", () => {
    expect(getFlowTypes().find(item => item.type === "decrease")).toStrictEqual(
      mockFlowTypes.decrease,
    );
  });
  it("Should know what a scope increase looks like", () => {
    expect(getFlowTypes().find(item => item.type === "increase")).toStrictEqual(
      mockFlowTypes.increase,
    );
  });
  it("Should know what a ticket that's been started looks like", () => {
    expect(getFlowTypes().find(item => item.type === "started")).toStrictEqual(
      mockFlowTypes.started,
    );
  });
  it("Should know what a ticket that's been developed looks like", () => {
    expect(
      getFlowTypes().find(item => item.type === "developed"),
    ).toStrictEqual(mockFlowTypes.developed);
  });
  it("Should know what a ticket that's been rejected looks like", () => {
    expect(getFlowTypes().find(item => item.type === "rejected")).toStrictEqual(
      mockFlowTypes.rejected,
    );
  });
  it("Should know what a ticket that's been fixed looks like", () => {
    expect(getFlowTypes().find(item => item.type === "fixed")).toStrictEqual(
      mockFlowTypes.fixed,
    );
  });
  it("Should know what a completed ticket looks like", () => {
    expect(
      getFlowTypes().find(item => item.type === "completed"),
    ).toStrictEqual(mockFlowTypes.completed);
  });
});
