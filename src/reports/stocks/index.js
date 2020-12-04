import getStockTypes from "../../states/stocks/get-stocks";
import { summariseByColumn, reportByColumn } from "./filter";

// TODO (dormerod): make reports configurable (not just hardcoded "In Progress")
// TODO (dormerod): add logic for emptry columns (i.e. nothing in progress)
function stocks(issues) {
  const stockTypes = getStockTypes();

  const stockSummary = `### Summary of upcoming work (number of tickets)
${summariseByColumn(
  stockTypes.backlog.description,
  stockTypes.backlog.columns,
  issues,
)}
${summariseByColumn(
  stockTypes.failed.description,
  stockTypes.failed.columns,
  issues,
)}
${summariseByColumn(stockTypes.wip.description, stockTypes.wip.columns, issues)}
${summariseByColumn(
  stockTypes.review.description,
  stockTypes.review.columns,
  issues,
)}
${summariseByColumn(
  stockTypes.uat.description,
  stockTypes.uat.columns,
  issues,
)}`.replace(/(\n){2,}/g, "\n"); // remove empty lines between statuses

  const workingReport = reportByColumn({
    reportTitle: stockTypes.wip.title,
    columns: stockTypes.wip.columns,
    issues,
  });

  const testingReport = reportByColumn({
    reportTitle: stockTypes.review.title,
    columns: stockTypes.review.columns,
    issues,
  });

  const reports = {
    stockSummary,
    workingReport,
    testingReport,
  };

  return reports;
}

export { stocks };
