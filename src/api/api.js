class API {
  constructor({ config, zenhub }) {
    Object.assign(this, { config, zenhub });
  }

  getZenhubBoard(repoID) {
    return new Promise((resolve, reject) => {
      this.zenhub.boards.getBoard(repoID, (error, data) => {
        if (error !== null) reject(error);
        else resolve(data);
      });
    });
  }

  getZenhubIssueEvents(repoID, issueNum) {
    return new Promise((resolve, reject) => {
      this.zenhub.issues.getIssueEvents(repoID, issueNum, (error, data) => {
        if (error !== null) reject(error);
        else resolve(data);
      });
    });
  }
}

export default API;
