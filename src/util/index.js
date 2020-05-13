const capitalize = function capitalizeFirstLetterOfString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const sleep = function sleepForMilliseconds(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export { capitalize, sleep };
