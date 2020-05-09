import data from "./data";
import { Time } from "./time";
import { stocks, flows } from "./reports";

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
    const { workingReport, testingReport } = stocks(self.zenhubIssues);

    console.log();
    console.log(time.description(), "\n");
    console.log(summaryReport, "\n");
    console.log(doneReport, "\n");
    console.log(workingReport, "\n");
    console.log(testingReport, "\n");
  });
};

export default kb;
