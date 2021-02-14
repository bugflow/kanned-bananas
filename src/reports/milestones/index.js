function milestoneReport({ time, issues, project, includedMilestones }) {
  const issuesByMilestone = [];

  includedMilestones.forEach(milestone => {
    const relevantIssues = issues.filter(
      issue => issue.milestone === milestone,
    );

    issuesByMilestone.push({
      title: milestone,
      issues: relevantIssues,
    });
  });

  let summary = `
# ${project.title} – Milestone Report

## ${project.subtitle}

**Report generated on:** ${time.today()}

_${time.description()}_`;

  issuesByMilestone.forEach(milestone => {
    summary += `\n\n### ${milestone.title}\n`;

    milestone.issues.forEach(issue => {
      summary += `\n${issue.title}`;
    });
  });

  summary.replace(/(\n){3,}/g, "\n\n"); // tidy up three or more consecutive line breaks

  return summary;
}

export { milestoneReport };
