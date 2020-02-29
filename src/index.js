import data from "./data";

const kb = function kannedBananas() {
  data.load().then(self => console.log(self.zenhubIssues));
};

export default kb;
