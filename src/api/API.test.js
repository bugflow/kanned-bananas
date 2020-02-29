import API from "./API";

// TODO (dormerod): test api.get() method

/* Mock config object */
const mockConfig = {
  githubToken: "123456789",
  zenhubToken: "987654321",
  project: {
    name: "Castles in the sky",
    zenhubWorkspaceID: "11235813",
    repos: [
      {
        description: "Castle app",
        id: "123",
        owner: "castle",
        name: "castle-app",
      },
      {
        description: "Castle infrastructure as code",
        id: "456",
        owner: "castle",
        name: "castle-cloud",
      },
    ],
  },
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
    expect(api.config.project.repos).toHaveLength(2);
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
      url: `https://api.zenhub.com/p2/workspaces/${mockConfig.project.zenhubWorkspaceID}/repositories/${mockConfig.project.repos[0].id}/board`,
    };
    const data = await api.getZenhubBoard(mockConfig.project.repos[0].id);

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
      url: `https://api.zenhub.com/p1/repositories/${mockConfig.project.repos[0].id}/issues/1/events`,
    };
    const data = await api.getZenhubEvents(mockConfig.project.repos[0].id, 1);

    expect(data).toBe(mockResponse);
    expect(mockAxios.mock.calls).toHaveLength(2);
    expect(mockAxios.mock.calls[1][0]).toStrictEqual(expectedResponse);
  });
});
