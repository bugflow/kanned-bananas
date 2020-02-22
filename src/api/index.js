import Zenhub from "node-zenhub";
import config from "../config/index";

const api = new Zenhub(config.token);

export default api;
