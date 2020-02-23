import { GraphQLClient } from "graphql-request";
import Zenhub from "node-zenhub";
import API from "./api/api";
import config from "./config/config";

const kb = function kannedBananas() {
  const zenhub = new Zenhub(config.zenhubToken);
  const api = new API({ config, GraphQLClient, zenhub });

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
    .then(response => console.log(response.repository.issues.edges))
    .catch(e => console.error(e));
};

export default kb;
