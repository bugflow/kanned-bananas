import fs from "fs";
import { promisify } from "util";
import Cache from "./Cache";

const readFile = promisify(fs.readFile);
const cache = new Cache({ fs, readFile });

export default cache;
