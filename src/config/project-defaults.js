// all legal properties should be defined here, because they get iterated
const projectDefaults = {
  title: null,
  subtitle: null,
  reportType: "delivery",
  period: "week",
  fromTimestamp: null,
  toTimestamp: null,
  overdelivery: false,
  includedLabels: [],
  excludedLabels: [
    "/^duplicate$/",
    "/^exclude$/",
    "/^ignore$/",
    "/^overtaken$/",
  ],
  includedMilestones: [],
  excludedMilestones: [],
  includedColumns: [], // TODO (dormerod): support filtering + excluding here
  zenhubWorkspaceID: null,
  repos: null,
};

export default projectDefaults;
