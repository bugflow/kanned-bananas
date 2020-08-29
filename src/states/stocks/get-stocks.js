import getColumns from "../columns/getColumns";

const columns = getColumns();

function getStockTypes() {
  // TODO (dormerod): add implied flows feature (for when columns are skipped)
  const stocks = {};

  stocks.backlog = {
    columns: [...columns.allBacklogs],
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

  return stocks;
}

export default getStockTypes;
