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

  async queryGithub(owner, repo, cursor = null) {
    // use after argument in query only if a cursor is provided
    // TODO (dormerod): fix the string interpolation for the cursor here
    let after = "";
    if (cursor !== null) after = `, after: "${cursor}"`;

    const query = /* GraphQL */ `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          name
          issues(first: 100${after}) {
            edges {
              node {
                number
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `;

    const variables = {
      owner,
      repo,
    };

    let data = null;
    try {
      data = await this.graphQL.request(query, variables);
    } catch (e) {
      console.error(e);
    }

    return data;
  }

  async getGithubIssues(owner, repo, cursor = null, issues = []) {
    let knownIssues;
    let response = null;

    try {
      response = await this.queryGithub(owner, repo, cursor);

      if (response) {
        // if we received new issues, add them to any previously received issues
        const newIssues = response.repository.issues.edges;
        knownIssues = [...issues, ...newIssues];

        // then recurse until we get all the issues for this repo
        // TODO (dormerod): use optional chaining here once ESLint supports it
        if (response.repository.issues.pageInfo.hasNextPage) {
          const nextCursor = response.repository.issues.pageInfo.endCursor;
          const nextIssues = await this.getGithubIssues(
            owner,
            repo,
            nextCursor,
            knownIssues,
          );

          // if nextIssues is iterable
          if (
            nextIssues !== null &&
            nextIssues !== undefined &&
            Symbol.iterator in Object(nextIssues)
          ) {
            // add the issues that bubble back up to our list of known issues
            knownIssues = [...knownIssues, ...nextIssues];
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    return knownIssues;
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
