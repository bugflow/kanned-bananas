import getFlowTypes from "./get-flows";

const mockFlowTypes = {
  decrease: {
    type: "decrease",
    from: [
      "Goals",
      "Long-term goals",
      "Short-term goals",
      "Product Backlog",
      "Sprint Planning",
      "Backlog",
      "Sprint Backlog",
    ],
    to: ["New Issues", "Icebox", "Some Future Sprint"],
    description: "Scope decrease",
  },
  increase: {
    type: "increase",
    from: ["New Issues", "Icebox", "Some Future Sprint"],
    to: [
      "Goals",
      "Long-term goals",
      "Short-term goals",
      "Product Backlog",
      "Sprint Planning",
      "Backlog",
      "Sprint Backlog",
    ],
    description: "Scope unpacked",
  },
  started: {
    type: "started",
    from: ["Backlog", "Sprint Backlog"],
    to: ["In Progress"],
    description: "Started",
  },
  exceeded: {
    type: "exceeded",
    from: [
      "New Issues",
      "Icebox",
      "Some Future Sprint",
      "Product Backlog",
      "Sprint Planning",
    ],
    to: ["Failed QA", "In Progress", "Review", "Review/QA"],
    description: "Exceeded sprint goals",
  },
  developed: {
    type: "developed",
    from: ["Backlog", "Sprint Backlog", "In Progress"],
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
  it("Should know what exceeding the sprint goals looks like", () => {
    expect(getFlowTypes().find(item => item.type === "exceeded")).toStrictEqual(
      mockFlowTypes.exceeded,
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
