import dotenv from "dotenv";

dotenv.config();
const config = JSON.parse(process.env.KANNED_BANANAS_CONFIG);
config.githubToken = process.env.GITHUB_TOKEN;
config.zenhubToken = process.env.ZENHUB_TOKEN;
config.githubEndpoint = "https://api.github.com/graphql";

export default config;
