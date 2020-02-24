import config from "./config/config";
import api from "./api/index";

const kb = function kannedBananas() {
  config.project.repos.forEach(repo => {
    api
      .getZenhubBoard(repo.id)
      .then(response => console.log(response))
      .catch(e => console.error(e));
  });

  api
    .getZenhubIssueEvents(config.project.repos[0].id, 1)
    .then(response => console.log(response))
    .catch(e => console.error(e));

  api
    .getGithubIssues(
      config.project.repos[0].owner,
      config.project.repos[0].name,
    )
    .then(response => console.log(response))
    .catch(e => console.error(e));
};

export default kb;
