class API {
  constructor({ config, GraphQLClient, zenhub }) {
    Object.assign(this, { config, GraphQLClient, zenhub });
  }

  async getGithubIssues(owner, repo) {
    const token = this.config.githubToken;
    const endpoint = "https://api.github.com/graphql";

    const graphQLClient = new this.GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

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

    const data = await graphQLClient.request(query);
    return data;
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
