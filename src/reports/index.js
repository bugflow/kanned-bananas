import deliveryReport from "./delivery";
import milestoneReport from "./milestones";

function runReport({ time, issues, project }) {
  if (project.reportType) {
    switch (project.reportType) {
      case "milestone":
        console.log(milestoneReport({ time, issues, project }));
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
