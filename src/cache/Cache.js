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
        // if the reporting window is before the cache last updated time...
        if (time.isBeforeEnd(this.data.lastUpdated)) return true;
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

  async ZenhubEvents({ repo, issue }) {
    let events;

    try {
      events = await this.api.getZenhubEvents({ repo, issue });
    } catch (e) {
      console.error(e);
    }

    return events;
  }
}

export default Cache;
