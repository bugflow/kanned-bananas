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

  description() {
    const now = DateTime.local();
    const timeSinceStart = Interval.fromDateTimes(this.range.start, now);
    const timeSinceEnd = Interval.fromDateTimes(this.range.end, now);

    // date formatting
    const formatWeekday = "cccc";
    const formatWeekdayDayMonth = "cccc d LLLL";
    const weekday = this.range.start.toFormat(formatWeekday);
    const startDate = this.range.start.toFormat(formatWeekdayDayMonth);
    const endDate = this.range.end.toFormat(formatWeekdayDayMonth);

    // we'll use a more informal and concise description for recent reports
    let rangeDescription;
    if (timeSinceStart.length("days") < 7) {
      // in the last week
      if (timeSinceEnd.length("days") <= 1) {
        // report ends within the last 24 hours
        if (this.range.start.toFormat("H") < 12) {
          rangeDescription = `Since ${weekday} morning...`;
        } else {
          rangeDescription = `Since ${weekday} afternoon...`;
        }
      } else if (this.range.length("days") <= 1) {
        // more than 24 hours ago, but the reporting period is a day or less
        rangeDescription = `On ${weekday}...`;
      } else {
        // more than 24 hours ago and more than one day
        rangeDescription = `From ${startDate} to ${endDate}...`;
      }
    } else if (this.range.length("days") <= 1) {
      // more than a week ago, but the reporting period is a day or less
      rangeDescription = `On ${startDate}...`;
    } else {
      // more than a week ago
      rangeDescription = `From ${startDate} to ${endDate}...`;
    }

    return rangeDescription;
  }

  inRange(timestamp) {
    if (timestamp) {
      const timeToCompare = DateTime.fromISO(timestamp);
      if (this.range.contains(timeToCompare)) return true;
    }

    return false;
  }

  isBeforeStart(timestamp) {
    const timeToCompare = DateTime.fromISO(timestamp);
    if (timeToCompare && this.range.start <= timeToCompare) return true;

    return false;
  }

  isBeforeEnd(timestamp) {
    const timeToCompare = DateTime.fromISO(timestamp);
    if (timeToCompare && this.range.end <= timeToCompare) return true;

    return false;
  }
}

export { Time };
