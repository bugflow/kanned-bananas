import API from "./API";

// TODO (dormerod): test api.get() method

/* Mock config object */
const mockConfig = {
  githubToken: "123456789",
  zenhubToken: "987654321",
  projects: [
    {
      name: "Castles in the sky",
      zenhubWorkspaceID: "11235813",
      repos: [
        {
          description: "Castle backend",
          zenhubID: "123",
          owner: "castle",
          name: "castle-backend",
        },
        {
          description: "Castle frontend",
          zenhubID: "456",
          owner: "castle",
          name: "castle-app",
        },
      ],
    },
    {
      name: "Castle on a cloud",
      zenhubWorkspaceID: "11237136",
      repos: [
        {
          description: "Castle infrastructure as code",
          zenhubID: "789",
          owner: "castle",
          name: "castle-cloud",
        },
      ],
    },
  ],
};

// Mock response for mock API wrappers
const mockResponse = { data: true };

/* Mock Axios client */
const mockAxios = jest.fn((...args) => {
  if (args[0] === false) throw new Error("This is a test error");
  else return { data: mockResponse };
});

/* Mock Github API */
const mockGraphQL = {
  request: jest.fn(() => mockResponse),
};

const api = new API({
  config: mockConfig,
  axios: mockAxios,
  graphQL: mockGraphQL,
});

/* Tests */
describe("API wrappers for Github and Zenhub", () => {
  it("should be instantiated with config, graphQL and axios objects", () => {
    expect(api.config).toBe(mockConfig);
    expect(api.config.githubToken).toBe("123456789");
    expect(api.config.projects[0].repos).toHaveLength(2);
    expect(api.axios).toBe(mockAxios);
    expect(api.graphQL).toBe(mockGraphQL);
  });

  /* api.queryGithub */
  it("uses api.graphQL to get Github issues", async () => {
    const data = await api.queryGithub(true);
    expect(data).toBe(mockResponse);
    expect(mockGraphQL.request).toHaveBeenCalled();
  });

  /* api.getZenhubBoard */
  it("constructs the right query when calling getZenhubBoard", async () => {
    const expectedResponse = {
      headers: { "X-Authentication-Token": mockConfig.zenhubToken },
      method: "get",
      params: {},
      url: `https://api.zenhub.com/p2/workspaces/${mockConfig.projects[0].zenhubWorkspaceID}/repositories/${mockConfig.projects[0].repos[0].zenhubID}/board`,
    };
    const data = await api.getZenhubBoard({
      project: mockConfig.projects[0],
      repo: mockConfig.projects[0].repos[0],
    });

    expect(data).toBe(mockResponse);
    expect(mockAxios.mock.calls).toHaveLength(1);
    expect(mockAxios.mock.calls[0][0]).toStrictEqual(expectedResponse);
  });

  /* api.getZenhubIssueEvents */
  it("constructs the right query when calling getZenhubEvents", async () => {
    const expectedResponse = {
      headers: { "X-Authentication-Token": mockConfig.zenhubToken },
      method: "get",
      params: {},
      url: `https://api.zenhub.com/p1/repositories/${mockConfig.projects[0].repos[0].zenhubID}/issues/1/events`,
    };
    const data = await api.getZenhubEvents({
      repo: mockConfig.projects[0].repos[0],
      issue: { issue_number: 1 },
    });

    expect(data).toBe(mockResponse);
    expect(mockAxios.mock.calls).toHaveLength(2);
    expect(mockAxios.mock.calls[1][0]).toStrictEqual(expectedResponse);
  });
});
