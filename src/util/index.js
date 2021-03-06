function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function tidyString(string) {
  // remove whitespace and weird punctuation
  const tidied = string
    .trim()
    .replace(/^(\.|,|;|:|\*)+/g, "") // remove leading punctuation
    .replace(/(\.|,|;|:|\*)+$/g, "") // remove trailing punctuation
    .trim();

  if (string !== tidied) return tidyString(tidied); // recurse until all tidy

  return tidied; // return the tidied string once there's nothing else to tidy
}

function typeset(string) {
  const formatted = string
    .replace(/-{3}/g, "—")
    .replace(/-{2}/g, "–")
    .replace(/ - /g, " – ");

  return formatted;
}

export { capitalize, sleep, tidyString, typeset };
