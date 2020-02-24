import API from "./API";

/* Mock config object */
const mockConfig = {
  githubToken: "123456789",
  zenhubToken: "987654321",
  project: {
    name: "Castles in the sky",
    repos: [
      {
        description: "Castle app",
        id: "123",
        owner: "castle-inc",
        name: "castle-app",
      },
      {
        description: "Castle infrastructure as code",
        id: "456",
        owner: "castle-inc",
        name: "castle-cloud",
      },
    ],
  },
};

// Mock response for mock API wrappers
const mockResponse = { data: true };

/* Mock Github API */
const mockGraphQL = {
  request: jest.fn(() => mockResponse),
};

/* Mock Zenhub API */
// if the first argument is true the callback returns data, otherwise an error
const mockCallback = jest.fn((...args) => {
  // pop the callback function from the final argument
  const cb = args.pop();
  if (args[0] === true) cb(null, mockResponse);
  else cb("error", null);
});

// Mock Zenhub methods with our mock callback
const mockZenhub = {
  boards: {
    getBoard: mockCallback,
  },
  issues: {
    getIssueEvents: mockCallback,
  },
};

const api = new API({
  config: mockConfig,
  graphQL: mockGraphQL,
  zenhub: mockZenhub,
});

/* Tests */
describe("API wrappers for Github and Zenhub", () => {
  it("should be instantiated with config, graphQL and zenhub objects", () => {
    expect(api.config).toBe(mockConfig);
    expect(api.config.githubToken).toBe("123456789");
    expect(api.config.project.repos).toHaveLength(2);
    expect(api.graphQL).toBe(mockGraphQL);
    expect(api.zenhub).toBe(mockZenhub);
  });

  /* api.getGithubIssues */
  it("uses api.graphQL to get Github issues", async () => {
    const data = await api.getGithubIssues(true);
    expect(data).toBe(mockResponse);
    expect(mockGraphQL.request).toHaveBeenCalled();
  });

  /* api.getZenhubBoard */
  it("resolves .getZenhubBoard when the callback succeeds", async () => {
    const data = await api.getZenhubBoard(true);
    expect(data).toBe(mockResponse);
    expect(mockCallback.mock.calls).toHaveLength(1);
    expect(mockCallback.mock.calls[0][0]).toBe(true);
  });
  it("rejects .getZenhubBoard when the callback fails", async () => {
    try {
      await api.getZenhubBoard(false);
    } catch (e) {
      expect(e).toMatch("error");
    }
    expect(mockCallback.mock.calls).toHaveLength(2);
    expect(mockCallback.mock.calls[1][0]).toBe(false);
  });

  /* api.getZenhubIssueEvents */
  it("resolves .getZenhubIssueEvents when the callback succeeds", async () => {
    const data = await api.getZenhubIssueEvents(true, 1);
    expect(data).toBe(mockResponse);
    expect(mockCallback.mock.calls).toHaveLength(3);
    expect(mockCallback.mock.calls[2][0]).toBe(true);
  });
  it("rejects .getZenhubIssueEvents when the callback fails", async () => {
    try {
      await api.getZenhubIssueEvents(false, 1);
    } catch (e) {
      expect(e).toMatch("error");
    }
    expect(mockCallback.mock.calls).toHaveLength(4);
    expect(mockCallback.mock.calls[3][0]).toBe(false);
  });
});
