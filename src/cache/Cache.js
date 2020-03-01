class Cache {
  constructor({ fs, readFile, file = "data.json", directory = "./.cache/" }) {
    this.fs = fs;
    this.readFile = readFile;
    this.file = file;
    this.directory = directory;
    this.path = `${directory}${file}`;
    this.data = null;
  }

  async isCurrent() {
    const data = await this.read();

    if (data !== null) {
      this.data = JSON.parse(data);
      // TODO (dormerod): logic to determine whether data is up to date

      return true;
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
