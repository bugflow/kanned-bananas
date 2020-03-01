import data from "./data";
import { flows } from "./reports";

const kb = function kannedBananas() {
  data.load().then(self => flows(self.zenhubIssues));
};

export default kb;
