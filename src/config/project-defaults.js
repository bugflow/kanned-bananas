// all legal properties should be defined here, because they get iterated
const projectDefaults = {
  title: null, // this appears at the top of the report as h1
  subtitle: null, // this is the h2 subheading
  reportType: "delivery", // one of "milestones", "stocks" and "delivery"
  period: "week", // "day", "week", "month", "fortnight", "quarter" or "year"
  fromTimestamp: null, // ISO8601
  toTimestamp: null,
  overdelivery: false, // report overdelivery if tickets skip the sprint backlog
  includedLabels: [], // regex string, not regex type (".*" not /.*/) see below
  excludedLabels: [
    "/^duplicate$/",
    "/^exclude$/",
    "/^ignore$/",
    "/^overtaken$/",
  ],
  includedMilestones: [], // GitHub milestone name as a string
  excludedMilestones: [],
  includedColumns: [], // TODO (dormerod): support filtering + excluding here
  zenhubWorkspaceID: null, // get this UUID from ZenHub URL, blech
  repos: null,
};

export default projectDefaults;
