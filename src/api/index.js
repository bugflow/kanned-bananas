import axios from "axios";
import config from "../config";
import API from "./API";

const api = new API({ axios, config });

export default api;
