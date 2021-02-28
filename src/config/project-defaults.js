// all legal properties should be defined here, because they get iterated
const projectDefaults = {
  title: null,
  subtitle: null,
  reportType: "delivery",
  period: "week",
  fromTimestamp: null,
  toTimestamp: null,
  includedLabels: [],
  excludedLabels: [
    "/^duplicate$/",
    "/^exclude$/",
    "/^ignore$/",
    "/^overtaken$/",
  ],
  includedMilestones: [],
  excludedMilestones: [],
  zenhubWorkspaceID: null,
  repos: null,
};

export default projectDefaults;
