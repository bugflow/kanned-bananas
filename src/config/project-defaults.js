// all legal properties should be defined here, because they get iterated
const projectDefaults = {
  title: null,
  subtitle: null,
  period: "week",
  fromTimestamp: null,
  toTimestamp: null,
  includedLabels: null,
  excludedLabels: [
    "/^duplicate$/",
    "/^exclude$/",
    "/^ignore$/",
    "/^overtaken$/",
  ],
  zenhubWorkspaceID: null,
  repos: null,
};

export default projectDefaults;
