import axios from "axios";
import { GraphQLClient } from "graphql-request";
import config from "../config/config";
import API from "./API";

const graphQL = new GraphQLClient(config.githubEndpoint, {
  headers: { authorization: `Bearer ${config.githubToken}` },
});
const api = new API({ axios, config, graphQL });

export default api;
