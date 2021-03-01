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

  let csv = `"unique_id", "repo", "id", "title", "milestone", "date_updated"`;

  issuesByMilestone.forEach(milestone => {
    milestone.issues.forEach(issue => {
      csv += `\n"${issue.repoName}#${issue.issue_number}", "${
        issue.repoName
      }", ${issue.issue_number}, "${issue.title
        .replace(/"/g, "'")
        .trim()}", "${issue.milestone.trim()}", ${issue.milestonedDate.slice(
        0,
        10,
      )}`;
    });
  });

  return `${csv}\n`; // add trailing newline
}

export default milestoneReport;
