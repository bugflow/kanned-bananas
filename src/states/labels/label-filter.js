function makeLabelFilter({ includedLabels = [], excludedLabels = [] }) {
  // create a callback function for the Array.prototype.filter method
  // curry the included/excluded labels because filter only passes one argument
  function filterByLabel(issue) {
    if (issue.labels) {
      // include issues by default
      let included = true;

      // we only need to filter against included labels if we have a filter list
      if (includedLabels) {
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
      if (included) {
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
    if (includedLabels) return false;

    // but we weren't filtering by label inclusion so include it anyway
    return true;
  }

  return filterByLabel;
}

export { makeLabelFilter };
