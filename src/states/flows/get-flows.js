import getColumns from "../columns/get-columns";

const columns = getColumns();

function getFlowTypes() {
  // TODO (dormerod): add implied flows feature (for when columns are skipped)
  const flows = [];

  flows.push({
    type: "decrease",
    from: [...columns.inScope],
    to: [...columns.outScope],
    description: "Scope decrease",
  });

  flows.push({
    type: "increase",
    from: [...columns.outScope],
    to: [...columns.inScope],
    description: "Scope increase",
  });

  flows.push({
    type: "started",
    from: [...columns.currentBacklogs],
    to: [...columns.wip],
    description: "Started",
  });

  flows.push({
    type: "exceeded",
    from: [...columns.outScope, ...columns.futureBacklogs],
    to: [...columns.active],
    description: "Exceeded sprint goals",
  });

  flows.push({
    type: "developed",
    from: [...columns.currentBacklogs, ...columns.wip],
    to: [...columns.review],
    description: "Developed",
  });

  flows.push({
    type: "rejected",
    from: [],
    to: [...columns.failed],
    description: "Rejected",
  });

  flows.push({
    type: "fixed",
    from: [...columns.failed],
    to: [...columns.wip, ...columns.review],
    description: "Fixed",
  });

  flows.push({
    type: "uat",
    from: [],
    to: [...columns.uat],
    description: "Added to UAT queue",
  });

  flows.push({
    type: "completed",
    from: [],
    to: [...columns.done],
    description: "Completed",
  });

  return flows;
}

export default getFlowTypes;
