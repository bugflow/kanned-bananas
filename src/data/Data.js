/* eslint-disable no-restricted-syntax */
class Data {
  constructor({ api, config, cache }) {
    Object.assign(this, { api, config, cache });

    this.githubIssues = [];
    this.zenhubIssues = [];
    this.zenhubBoards = [];
  }

  async load() {
    const now = new Date();

    if (await this.cache.isCurrent(now)) {
      this.githubIssues = this.cache.data.githubIssues;
      this.zenhubIssues = this.cache.data.zenhubIssues;
      this.zenhubBoards = this.cache.data.zenhubBoards;
    } else {
      await this.loadGithubData();
      await this.loadZenhubData();

      const json = JSON.stringify({
        lastUpdated: now,
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
        this.zenhubBoards.push(board);

        for await (const column of board.pipelines) {
          for await (const issue of column.issues) {
            // find the matching issue from Github, to get the title etc
            const foundRepo = this.githubIssues.find(
              searchedRepo => searchedRepo.name === repo.name,
            );

            if (foundRepo) {
              const foundIssue = foundRepo.issues.find(
                searched => searched.node.number === issue.issue_number,
              );

              // if we found the issue title etc, add it to the current issue
              if (foundIssue) issue.title = foundIssue.node.title;
            }

            // add other useful data to each issue
            issue.column = column.name;
            issue.repoName = repo.name;
            issue.repoID = repo.id;

            issue.events = await this.api.getZenhubEvents(
              repo.id,
              issue.issue_number,
            );

            this.zenhubIssues.push(issue);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}
/* eslint-enable no-restricted-syntax */

export default Data;
