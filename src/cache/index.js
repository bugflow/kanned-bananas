import fs from "fs";
import { promisify } from "util";
import api from "../api";
import Cache from "./Cache";

const readFile = promisify(fs.readFile);
const cache = new Cache({ api, fs, readFile });

export default cache;
