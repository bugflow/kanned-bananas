function filterByLabel(issue, includedLabels = [], excludedLabels = []) {
  if (issue.labels) {
    // include issues by default
    let included = true;

    // we only need to filter against included labels if we have a filter list
    if (includedLabels.length > 0) {
      includedLabels.forEach(includedLabel => {
        if (issue.labels.some(label => includedLabel.test(label))) {
          // as long as we keep matching labels, return true (this is an AND)
          included = included && true;
        } else {
          included = false;
        }
      });
    }

    // if this issue isn't included, we don't need to check if it's excluded
    if (excludedLabels.length > 0 && included) {
      excludedLabels.forEach(excludedLabel => {
        if (issue.labels.some(label => excludedLabel.test(label))) {
          // as soon as we find an excluded label, return false (this is an OR)
          included = false;
        }
      });
    }

    return included;
  }
  // there were no labels for this issue

  // and we're filtering by label inclusion
  if (includedLabels.length > 0) return false;

  // but we weren't filtering by label inclusion so include it anyway
  return true;
}

export default filterByLabel;
