import config from "../config";
import api from "../api";
import cache from "../cache";
import { Data } from "../data";
import { dailySummary } from "../reports";
import { Time } from "../time";
import { makeLabelFilter } from "../states/labels";

async function runProjects() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const project of config.projects) {
    // TODO (dormerod): get project period and frequency from config
    const time = new Time({
      period: "week",
    });

    const data = new Data({ api, cache, config });

    try {
      const projectData = await data.load({ project, time });

      // apply label filters
      const includedLabels = [];
      const excludedLabels = [/^duplicate$/, /^exclude$/, /^overtaken$/];
      const filterByLabel = makeLabelFilter({ includedLabels, excludedLabels });
      const issues = projectData.zenhubIssues.filter(filterByLabel);

      console.log(dailySummary({ time, issues, project }));
    } catch (e) {
      console.error(e);
    }
  }
}

export { runProjects };
