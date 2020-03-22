import { DateTime, Interval } from "luxon";
import durationFn from "./duration";

class Time {
  constructor({ fromTimestamp, toTimestamp, period = "day" }) {
    const duration = durationFn(period);
    const oneSecond = { seconds: 1 };
    let start;
    let end;

    if (fromTimestamp) {
      // if we have fromTimestamp and toTimestamp (ISO 8601), just use those
      // otherwise, if we have only fromTimestamp, calculate an end time
      start = DateTime.fromISO(fromTimestamp);
      if (toTimestamp) {
        end = DateTime.fromISO(toTimestamp);
      } else {
        end = start.plus(duration).minus(oneSecond);
      }
    } else if (toTimestamp) {
      // we have toTimestamp, but not fromTimestamp, so calculate a start time
      end = DateTime.fromISO(toTimestamp);
      start = end.minus(duration).plus(oneSecond);
    } else {
      // we don't have any from or to timestamps, so make some assumptions
      // calculate a duration working back from today and ending before midnight
      // TODO (dormerod): previous fortnight, quarter etc (maybe not right here)
      start = DateTime.local()
        .minus(duration)
        .startOf("day");

      end = DateTime.local()
        .minus({ day: 1 })
        .endOf("day");
    }

    this.range = Interval.fromDateTimes(start, end);
  }

  inRange(timestamp) {
    if (timestamp) {
      const timeToCompare = DateTime.fromISO(timestamp);
      if (this.range.contains(timeToCompare)) return true;

      return false;
    }
    return false;
  }
}

export { Time };
