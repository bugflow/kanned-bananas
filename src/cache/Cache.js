class Cache {
  constructor({
    api,
    fs,
    readFile,
    file = "data.json",
    directory = "./.cache/",
  }) {
    Object.assign(this, { api, fs, readFile, file, directory });

    this.path = `${directory}${file}`;
    this.data = null;
  }

  async isCurrent(time) {
    const data = await this.read();

    if (data !== null) {
      this.data = JSON.parse(data);

      if (this.data.lastUpdated) {
        // if the reporting window ends before the cache last updated time...
        if (time.isAfterEnd(this.data.lastUpdated)) return true;
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
      process.exit(1);
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
      process.exit(1);
    }
  }

  async ZenhubEvents({ repo, issue }) {
    let events;

    try {
      events = await this.api.getZenhubEvents({ repo, issue });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    return events;
  }
}

export default Cache;
