import { GraphQLClient } from "graphql-request";
import Zenhub from "node-zenhub";
import config from "../config/config";
import API from "./API";

const graphQL = new GraphQLClient(config.githubEndpoint, {
  headers: { authorization: `Bearer ${config.githubToken}` },
});
const zenhub = new Zenhub(config.zenhubToken);
const api = new API({ config, graphQL, zenhub });

export default api;
