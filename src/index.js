import config from "./config/index";
import api from "./api/index";

const kb = function kannedBananas() {
  config.boards.forEach(boardID => {
    api.boards.getBoard(boardID, (error, data) =>
      error ? console.log(error) : console.log(data),
    );
  });
};

export default kb;
