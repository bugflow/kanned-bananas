function milestoneReport({ issues, project }) {
  const issuesByMilestone = [];

  project.includedMilestones.forEach(milestone => {
    const relevantIssues = issues.filter(
      issue => issue.milestone === milestone,
    );

    issuesByMilestone.push({
      title: milestone,
      issues: relevantIssues,
    });
  });

  let csv = `\n"id", "title", "milestone", "date_updated", "repo"`;

  issuesByMilestone.forEach(milestone => {
    milestone.issues.forEach(issue => {
      csv += `\n${issue.issue_number}, "${issue.title
        .replace(/"/g, "'")
        .trim()}", "${issue.milestone.trim()}", ${issue.milestonedDate.slice(
        0,
        10,
      )}, "${issue.repoName}"`;
    });
  });

  return csv;
}

export default milestoneReport;
