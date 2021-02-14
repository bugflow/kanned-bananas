// TODO (dormerod): add more tests for this function
function filterByMilestone(
  issue,
  includedMilestones = [],
  excludedMilestones = [],
) {
  if (issue.milestone !== null) {
    // include issues by default
    let included = true;

    // we only need to filter against included milestones if we received some
    if (includedMilestones.length > 0) {
      if (includedMilestones.includes(issue.milestone)) {
        included = true;
      } else {
        included = false;
      }
    }

    // if this issue isn't included, we don't need to check if it's excluded
    if (excludedMilestones.length > 0 && included) {
      if (excludedMilestones.includes(issue.milestone)) {
        included = false;
      }
    }

    return included;
  }
  // this issue didn't have a milestone

  // and we're filtering by milestone inclusion
  if (includedMilestones.length > 0) return false;

  // but we weren't filtering by milestone inclusion so include it anyway
  return true;
}

export default filterByMilestone;
