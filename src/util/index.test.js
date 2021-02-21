import { capitalize, tidyString, typeset } from ".";

describe("Capitalising strings", () => {
  const inputString1 = "this is a string";
  const expectedString1 = "This is a string";
  it("should capitalise the first letter of a lowercase string", () => {
    expect(capitalize(inputString1)).toBe(expectedString1);
  });

  const inputString2 = "this Is A sTriNg.";
  const expectedString2 = "This Is A sTriNg.";
  it("shouldn't change the case of any other characters", () => {
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

  it("should remove leading and trailing punctuation", () => {
    expect(tidyString(inputString1)).toBe(expectedString1);
    expect(tidyString(inputString2)).toBe(expectedString2);
    expect(tidyString(inputString3)).toBe(expectedString3);
    expect(tidyString(inputString4)).toBe(expectedString4);
    expect(tidyString(inputString5)).toBe(expectedString5);
  });
});

describe("Typesetting strings (to make them beautiful)", () => {
  const inputString1 = "automatic - en dash";
  const expectedString1 = "automatic – en dash";
  it("should automatically replace spaced hyphens with en dashes", () => {
    expect(typeset(inputString1)).toBe(expectedString1);
  });

  const inputString2 = "LaTeX style en dash-- just like that!";
  const expectedString2 = "LaTeX style en dash– just like that!";
  it("should replace double hyphens with en dashes", () => {
    expect(typeset(inputString2)).toBe(expectedString2);
  });

  const inputString3 = "LaTeX style em dash--- just like that!";
  const expectedString3 = "LaTeX style em dash— just like that!";
  it("should replace triple hyphens with em dashes", () => {
    expect(typeset(inputString3)).toBe(expectedString3);
  });

  const inputString4 = "this-- – weird - thing -- which—someone --- wrote";
  const expectedString4 = "this– – weird – thing – which—someone — wrote";
  it("should be able to deal with a mix of typesetting tasks", () => {
    expect(typeset(inputString4)).toBe(expectedString4);
  });
});
