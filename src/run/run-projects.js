import config from "../config";
import api from "../api";
import cache from "../cache";
import { Data } from "../data";
import { Time } from "../time";
import makePropertyFilter from "../states/properties";
import runReport from "../reports";

async function runProjects() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const project of config.projects) {
    const time = new Time(project);
    const data = new Data({ api, cache, config });

    try {
      const projectData = await data.load({ project, time });
      const issues = projectData.zenhubIssues.filter(
        makePropertyFilter(project),
      );

      runReport({ time, issues, project });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

export { runProjects };
