import { capitalize, tidyString } from ".";

describe("Capitalising strings", () => {
  const inputString1 = "this is a string";
  const expectedString1 = "This is a string";
  it("Should should capitalise the first letter of a lowercase string", () => {
    expect(capitalize(inputString1)).toBe(expectedString1);
  });

  const inputString2 = "this Is A sTriNg.";
  const expectedString2 = "This Is A sTriNg.";
  it("Shouldn't change the case of any other characters", () => {
    expect(capitalize(inputString2)).toBe(expectedString2);
  });
});

describe("Tidying up strings", () => {
  const inputString1 = "string with a full stop.";
  const expectedString1 = "string with a full stop";
  const inputString2 = "\t string with white space   ";
  const expectedString2 = "string with white space";
  const inputString3 = "*asterisks*";
  const expectedString3 = "asterisks";
  const inputString4 = "trailing comma,";
  const expectedString4 = "trailing comma";
  const inputString5 = "; : the *kitchen* sink... *,;";
  const expectedString5 = "the *kitchen* sink";

  it("Should remove leading and trailing punctuation", () => {
    expect(tidyString(inputString1)).toBe(expectedString1);
    expect(tidyString(inputString2)).toBe(expectedString2);
    expect(tidyString(inputString3)).toBe(expectedString3);
    expect(tidyString(inputString4)).toBe(expectedString4);
    expect(tidyString(inputString5)).toBe(expectedString5);
  });
});
