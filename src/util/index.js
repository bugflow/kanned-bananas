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
    .replace(/^(\.|,|;|:|\*)/) // remove leading punctuation
    .replace(/(\.|,|;|:|\*)$/) // remove trailing punctuation
    .trim();
  return tidied;
}

export { capitalize, sleep, tidyString };
