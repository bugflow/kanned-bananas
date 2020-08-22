function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { capitalize, sleep };
