import getFlowTypes from "./get-flows";

function gatherFlowEvents(time, issues) {
  const flowTypes = getFlowTypes();
  const flowEvents = { Other: [] };

  // populate flowEvents with event keys and arrays, ready to push events to
  flowTypes.forEach(state => {
    const key = state.description; // TODO (dormerod): .description to .type
    flowEvents[key] = [];
  });

  issues.forEach(issue => {
    issue.events.forEach(event => {
      if (
        event &&
        event.type === "transferIssue" && // event is a flow between columns
        time.inRange(event.created_at) // event is in the reporting timeframe
      ) {
        if (event.to_pipeline && event.to_pipeline.name) {
          const foundType = flowTypes.find(state => {
            if (
              state.to.includes(event.to_pipeline.name) &&
              (state.from.length === 0 || // treat empty 'from' array as wildcard
                state.from.includes(event.from_pipeline.name))
            ) {
              return true;
            }
            return false;
          });
          if (foundType) {
            // guard against data saying a ticket was completed more than once
            if (
              foundType.description === "Completed" &&
              flowEvents[foundType.description].some(
                item => item.issue_number === issue.issue_number,
              )
            ) {
              // don't push the issue, because it was already marked completed
            } else {
              flowEvents[foundType.description].push(issue);
            }
          }
        }
      }
    });
  });

  return flowEvents;
}

export default gatherFlowEvents;
