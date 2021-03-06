import dotenv from "dotenv";
import fs from "fs";

function readConfig(configFile = "./kb.config.json") {
  dotenv.config();

  let config;
  if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile));
  } else {
    config = JSON.parse(process.env.KANNED_BANANAS_CONFIG);
  }

  config.githubToken = process.env.GITHUB_TOKEN;
  config.zenhubToken = process.env.ZENHUB_TOKEN;
  config.githubEndpoint = "https://api.github.com/graphql";

  return config;
}

export default readConfig;
