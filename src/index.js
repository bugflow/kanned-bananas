import data from "./data";
import { Time } from "./time";
import { flows } from "./reports";

const kb = function kannedBananas() {
  const time = new Time({
    period: "day",
  });

  data.load().then(self => {
    const flowArgs = {
      time,
      issues: self.zenhubIssues,
    };
    const { summaryReport, doneReport } = flows(flowArgs);

    console.log(summaryReport, "\n");
    console.log(doneReport);
  });
};

export default kb;
