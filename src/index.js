import config from "./config";
import api from "./api";
import cache from "./cache";
import { Data } from "./data";
import { dailySummary } from "./reports";
import { Time } from "./time";

function kb() {
  const time = new Time({
    period: "week",
  });

  config.projects.forEach(project => {
    const data = new Data({ api, cache, config });

    data
      .load({ project, time })
      .then(self => {
        console.log(dailySummary({ time, issues: self.zenhubIssues }));
      })
      .catch(e => console.error(e));
  });
}

export default kb;
