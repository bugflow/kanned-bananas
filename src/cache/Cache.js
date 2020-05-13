import { DateTime } from "luxon";

class Cache {
  constructor({ fs, readFile, file = "data.json", directory = "./.cache/" }) {
    Object.assign(this, { fs, readFile, file, directory });

    this.path = `${directory}${file}`;
    this.data = null;
  }

  async isCurrent(time) {
    const data = await this.read();

    if (data !== null) {
      this.data = JSON.parse(data);

      if (this.data.lastUpdated) {
        const timeLastUpdated = DateTime.fromISO(this.data.lastUpdated);

        // if the reporting window is before the cache last updated time...
        if (time.isBefore(timeLastUpdated)) return true;
      }
    }

    return false;
  }

  async read() {
    const { fs, readFile, path } = this;

    try {
      if (fs.existsSync(path)) {
        return readFile(path, "utf8");
      }
    } catch (e) {
      console.error(`Cached kanban at ${path} could not be read: ${e}`);
    }

    return null;
  }

  write(json) {
    const { fs, directory, path } = this;

    try {
      // if the cache directory doesn't exist, create one
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      // write data to disk
      fs.writeFile(path, json, e => {
        if (e) throw e;
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default Cache;
