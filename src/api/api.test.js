import API from "./api";

const mockConfig = {
  token: "123456789",
  boards: [1, 2, 3, 4],
};

// Mock callback function and response for testing promise wrapping
const mockResponse = { data: true };
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

const api = new API({ config: mockConfig, zenhub: mockZenhub });

describe("A promise-based wrapper for the Zenhub API", () => {
  it("should be instantiated with config and zenhub objects", () => {
    expect(api.config).toBe(mockConfig);
    expect(api.config.token).toBe("123456789");
    expect(api.config.boards).toHaveLength(4);
    expect(api.zenhub).toBe(mockZenhub);
  });

  /* api.getZenhubBoard */
  it("resolves .getZenhubBoard when the callback succeeds", async () => {
    const data = await api.getZenhubBoard(true);
    expect(data).toBe(mockResponse);
  });
  it("rejects .getZenhubBoard when the callback fails", async () => {
    try {
      await api.getZenhubBoard(false);
    } catch (e) {
      expect(e).toMatch("error");
    }
  });

  /* api.getZenhubIssueEvents */
  it("resolves .getZenhubIssueEvents when the callback succeeds", async () => {
    const data = await api.getZenhubIssueEvents(true, 1);
    expect(data).toBe(mockResponse);
  });
  it("rejects .getZenhubIssueEvents when the callback fails", async () => {
    try {
      await api.getZenhubIssueEvents(false, 1);
    } catch (e) {
      expect(e).toMatch("error");
    }
  });
});
