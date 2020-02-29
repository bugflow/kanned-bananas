import Data from "./Data";
import api from "../api";
import config from "../config";
import cache from "../cache";

const data = new Data({ api, config, cache });

export default data;
