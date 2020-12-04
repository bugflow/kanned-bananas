import getColumns from "../columns/get-columns";

const columns = getColumns();

function getStockTypes() {
  // TODO (dormerod): add implied flows feature (for when columns are skipped)
  const stocks = {};

  stocks.backlog = {
    columns: [...columns.futureBacklogs, ...columns.currentBacklogs],
    title: "Backlog",
    description: "To do",
  };

  stocks.failed = {
    columns: [...columns.failed],
    title: "Currently fixing",
    description: "To fix",
  };

  stocks.wip = {
    columns: [...columns.wip],
    title: "Currently working on",
    description: "In progress",
  };

  stocks.review = {
    columns: [...columns.review],
    title: "Currently testing",
    description: "To test",
  };

  stocks.uat = {
    columns: [...columns.uat],
    title: "Currently awaiting UAT",
    description: "Awaiting UAT",
  };

  return stocks;
}

export default getStockTypes;
