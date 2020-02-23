import Zenhub from "node-zenhub";
import API from "./api/api";
import config from "./config/config";

const kb = function kannedBananas() {
  const zenhub = new Zenhub(config.token);
  const api = new API({ config, zenhub });

  config.boards.forEach(boardID => {
    api
      .getZenhubBoard(boardID)
      .then(response => console.log(response))
      .catch(e => console.error(e));
  });

  api
    .getZenhubIssueEvents(config.boards[0], 1)
    .then(response => console.log(response))
    .catch(e => console.error(e));
};

export default kb;
