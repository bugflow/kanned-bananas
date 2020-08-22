import dotenv from "dotenv";
import fs from "fs";

function getConfig() {
  const kbConfigFile = "./kb.config.json";
  dotenv.config();

  let config;
  if (fs.existsSync(kbConfigFile)) {
    config = JSON.parse(fs.readFileSync(kbConfigFile));
  } else {
    config = JSON.parse(process.env.KANNED_BANANAS_CONFIG);
  }

  config.githubToken = process.env.GITHUB_TOKEN;
  config.zenhubToken = process.env.ZENHUB_TOKEN;
  config.githubEndpoint = "https://api.github.com/graphql";

  return config;
}

export default getConfig;
