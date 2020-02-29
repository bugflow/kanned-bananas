import fs from "fs";

class Cache {
  constructor() {
    this.fs = fs;
  }

  async isHot() {
    if (this) {
      // TODO
    }

    return false;
  }

  async write({ json, file = "data.json", directory = "./.cache/" }) {
    const path = `${directory}${file}`;

    try {
      // if the cache directory doesn't exist, create one
      if (!this.fs.existsSync(directory)) {
        this.fs.mkdirSync(directory, { recursive: true });
      }

      // write data to disk
      await this.fs.writeFile(path, json, e => {
        if (e) throw e;
        console.log(`Cached current kanban state to: ${path}`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default Cache;
