import duration from "./duration";

describe("Return a duration object based on a period (e.g. 'day', 'week'", () => {
  it("Should return 1 year for 'year'", () => {
    expect(duration("year")).toStrictEqual({ years: 1 });
  });
  it("Should return 3 months for 'quarter'", () => {
    expect(duration("quarter")).toStrictEqual({ months: 3 });
  });
  it("Should return 1 months for 'month'", () => {
    expect(duration("month")).toStrictEqual({ months: 1 });
  });
  it("Should return 2 weeks for 'fortnight'", () => {
    expect(duration("fortnight")).toStrictEqual({ weeks: 2 });
  });
  it("Should return 1 week for 'week'", () => {
    expect(duration("week")).toStrictEqual({ weeks: 1 });
  });
  it("Should return 1 days for 'day'", () => {
    expect(duration("day")).toStrictEqual({ days: 1 });
  });
  it("Should return 1 days for undefined", () => {
    expect(duration(undefined)).toStrictEqual({ days: 1 });
  });
  it("Should return 1 days for null", () => {
    expect(duration(null)).toStrictEqual({ days: 1 });
  });
  it("Should return 1 days for random string", () => {
    const randomString = Math.random()
      .toString(36) // radix 36, i.e. 0-9 and a-z
      .slice(2);
    expect(duration(randomString)).toStrictEqual({ days: 1 });
  });
});
