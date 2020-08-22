function duration(period) {
  let result;

  switch (period) {
    case "year":
      result = { years: 1 };
      break;
    case "quarter":
      result = { months: 3 };
      break;
    case "month":
      result = { months: 1 };
      break;
    case "fortnight":
      result = { weeks: 2 };
      break;
    case "week":
      result = { weeks: 1 };
      break;
    default:
      // "day"
      result = { days: 1 };
  }

  return result;
}

export default duration;
