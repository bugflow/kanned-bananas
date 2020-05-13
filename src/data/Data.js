import { DateTime } from "luxon";
import { sleep } from "../util";

/* eslint-disable no-restricted-syntax */
class Data {
  constructor({ api, config, cache }) {
    Object.assign(this, { api, config, cache });

    this.githubIssues = [];
    this.closedIssues = [];
    this.zenhubIssues = [];
    this.zenhubBoards = [];
  }

  async load(time) {
    if (await this.cache.isCurrent(time)) {
      this.githubIssues = this.cache.data.githubIssues;
      this.zenhubIssues = this.cache.data.zenhubIssues;
      this.zenhubBoards = this.cache.data.zenhubBoards;
    } else {
      await this.loadGithubData();
      await this.loadZenhubData();

      const json = JSON.stringify({
        lastUpdated: DateTime.utc().toString(),
        githubIssues: this.githubIssues,
        zenhubIssues: this.zenhubIssues,
        zenhubBoards: this.zenhubBoards,
      });

      this.cache.write(json);
    }

    return this;
  }

  async loadGithubData() {
    for await (const repo of this.config.project.repos) {
      try {
        const issues = await this.api.getGithubIssues(repo.owner, repo.name);

        // save arrays of closed issues for adding to the Zenhub board later
        const closedIssues = issues
          .filter(issue => issue.node.closed)
          .map(issue => ({
            issue_number: issue.node.number,
            is_epic: null, // TODO: consider adding epic status if useful
            position: null,
          }));
        this.closedIssues.push({ name: repo.name, issues: closedIssues });

        // save issues by repo
        this.githubIssues.push({ name: repo.name, issues });
      } catch (e) {
        console.error(e);
      }
    }
  }

  async loadZenhubData() {
    for await (const repo of this.config.project.repos) {
      try {
        const board = await this.api.getZenhubBoard(repo.id);

        // add another column for closed isses (not included by default)
        const closedIssues = this.closedIssues.find(
          searchedRepo => searchedRepo.name === repo.name,
        ).issues;

        const closedColumn = {
          id: "closed",
          name: "Closed",
          issues: closedIssues,
        };

        board.pipelines.push(closedColumn);
        this.zenhubBoards.push(board);

        // add Zenhub issue events and other data to issues
        for await (const column of board.pipelines) {
          for await (const issue of column.issues) {
            await sleep(600); // Zenhub API rate limit is 100 requests per min

            issue.column = column.name;
            issue.repoName = repo.name;
            issue.repoID = repo.id;
            issue.events = await this.api.getZenhubEvents(
              repo.id,
              issue.issue_number,
            );

            // find the matching issue from Github, to get the title etc
            const foundRepo = this.githubIssues.find(
              searchedRepo => searchedRepo.name === repo.name,
            );

            let foundIssue = null;
            if (foundRepo) {
              foundIssue = foundRepo.issues.find(
                searched => searched.node.number === issue.issue_number,
              );
            }

            if (foundIssue) {
              // if we found the Github issue, add issue close events and title
              issue.title = foundIssue.node.title;
              if (foundIssue.node.closed) {
                issue.events.unshift({
                  user_id: null,
                  type: "transferIssue",
                  created_at: foundIssue.node.closedAt,
                  from_pipeline: {
                    name: null,
                  },
                  to_pipeline: {
                    name: "Closed",
                  },
                  workspace_id: null,
                });
              }
            }

            this.zenhubIssues.push(issue);
          }
        }
      } catch (e) {
        console.error(e);
      }

      await sleep(600); // Zenhub API rate limit is 100 requests per min
    }
  }
}
/* eslint-enable no-restricted-syntax */

export default Data;
