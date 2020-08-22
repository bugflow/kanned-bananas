import data from "./data";
import { dailySummary } from "./reports";
import { Time } from "./time";

function kb() {
  const time = new Time({
    period: "week",
  });

  data
    .load(time)
    .then(self => {
      console.log(dailySummary({ time, issues: self.zenhubIssues }));
    })
    .catch(e => console.error(e));
}

export default kb;
