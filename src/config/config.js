import dotenv from "dotenv";

dotenv.config();
const config = JSON.parse(process.env.KANNED_BANANAS_CONFIG);
config.token = process.env.ZENHUB_TOKEN;

export default config;
