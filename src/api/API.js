class API {
  constructor({ axios, config }) {
    Object.assign(this, { axios, config });
  }

  async get(headers, url, params = {}) {
    const request = { method: "get", headers, url, params };

    let response = { data: null };
    try {
      response = await this.axios(request);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    return response.data;
  }

  async queryGithub(owner, repo, cursor = null) {
    // use after argument in query only if a cursor is provided
    // TODO (dormerod): fix the string interpolation for the cursor here
    let after = "";
    if (cursor !== null) after = `, after: "${cursor}"`;

    const url = this.config.githubEndpoint;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.githubToken}`,
    };

    const query = /* GraphQL */ `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          name
          issues(first: 100${after}) {
            edges {
              node {
                number
                title
                milestone {
                  title
                }
                labels(first: 10) {
                  edges {
                    node{
                      name
                    }
                  }
                }
                closed
                closedAt
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

    const request = {
      url,
      method: "post",
      headers,
      data: {
        query,
        variables,
      },
    };

    let response = null;
    try {
      response = await this.axios(request);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    return response.data.data;
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
      process.exit(1);
    }

    return knownIssues;
  }

  async getZenhubBoard({ project, repo }) {
    const headers = {
      "Content-Type": "application/json",
      "X-Authentication-Token": this.config.zenhubToken,
    };
    const endpoint = `https://api.zenhub.com/p2/workspaces/${project.zenhubWorkspaceID}/repositories/${repo.zenhubID}/board`;

    const response = await this.get(headers, endpoint);
    return response;
  }

  async getZenhubEvents({ repo, issue }) {
    const headers = {
      "Content-Type": "application/json",
      "X-Authentication-Token": this.config.zenhubToken,
    };
    const endpoint = `https://api.zenhub.com/p1/repositories/${repo.zenhubID}/issues/${issue.issue_number}/events`;

    // TODO (dormerod): add some robust error handling here
    const response = await this.get(headers, endpoint);
    return response;
  }
}

export default API;
