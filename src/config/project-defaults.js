// all legal properties should be defined here, because they get iterated
const projectDefaults = {
  title: null, // this is what appears on the repot (h1)
  subtitle: null, // h2 subheading
  reportType: "delivery", // one of "milestones", "stocks" and "delivery"
  period: "week", // one of "day", "week", "month", "fortnight", "quarter", "year"
  fromTimestamp: null, // ISO8601
  toTimestamp: null,
  overdelivery: false, // if something is not in the sprint backlog, report it as "over-delivery"
  includedLabels: [], // regex expression string, not .js regex
  excludedLabels: [
    "/^duplicate$/",
    "/^exclude$/",
    "/^ignore$/",
    "/^overtaken$/",
  ],
  includedMilestones: [], // GitHub milestone name
  excludedMilestones: [],
  includedColumns: [], // TODO (dormerod): support filtering + excluding here
  zenhubWorkspaceID: null, // get this UUID from ZenHub URL, blech
  repos: null,
};

export default projectDefaults;
