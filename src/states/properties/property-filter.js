import filterByLabel from "./labels";
import filterByMilestone from "./milestones";

function makePropertyFilter({
  includedLabels = [],
  excludedLabels = [],
  includedMilestones = [],
  excludedMilestones = [],
}) {
  // create a callback function for the Array.prototype.filter method
  // curry the included/excluded labels because filter only passes one argument
  function filterByProperty(issue) {
    return (
      // the && operator here means issues will only be included if _all_ of the
      // inclusion filters are met and _none_ of the exclusion filters are met
      filterByLabel(issue, includedLabels, excludedLabels) &&
      filterByMilestone(issue, includedMilestones, excludedMilestones)
    );
  }
  return filterByProperty;
}

export default makePropertyFilter;
