import deliveryReport from "./delivery";
import milestoneReport from "./milestones";
import stocksCSV from "./stocks/csv";

function runReport({ time, issues, project }) {
  if (project.reportType) {
    switch (project.reportType) {
      case "milestone":
        console.log(milestoneReport({ time, issues, project }));
        break;

      case "stocks":
        console.log(stocksCSV({ time, issues, project }));
        break;

      case "delivery":
      default:
        console.log(deliveryReport({ time, issues, project }));
        break;
    }
  } else {
    console.log("Please specify a reportType");
  }
}

export default runReport;
