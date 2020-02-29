class API {
  constructor({ axios, config, graphQL }) {
    Object.assign(this, { axios, config, graphQL });
  }

  async get(headers, url, params = {}) {
    const request = { method: "get", headers, url, params };

    let response = { data: null };
    try {
      response = await this.axios(request);
    } catch (e) {
      console.error(e);
    }

    return response.data;
  }

  async getGithubIssues(owner, repo) {
    // TODO (dormerod): figure out why GQL variables failed, fix interpolation
    const query = /* GraphQL */ `
      query {
        repository(owner: "${owner}", name: "${repo}") {
          issues(last: 100) {
            edges {
              node {
                number
                title
              }
            }
          }
        }
      }
    `;

    const data = await this.graphQL.request(query);
    return data;
  }

  async getZenhubBoard(repoID) {
    const headers = {
      "X-Authentication-Token": this.config.zenhubToken,
    };
    const endpoint = `https://api.zenhub.com/p2/workspaces/${this.config.project.zenhubWorkspaceID}/repositories/${repoID}/board`;

    const response = await this.get(headers, endpoint);
    return response;
  }

  async getZenhubEvents(repoID, issueNum) {
    const headers = {
      "X-Authentication-Token": this.config.zenhubToken,
    };
    const endpoint = `https://api.zenhub.com/p1/repositories/${repoID}/issues/${issueNum}/events`;

    const response = await this.get(headers, endpoint);
    return response;
  }
}

export default API;
