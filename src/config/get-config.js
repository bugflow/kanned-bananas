import readConfig from "./read-config";
import projectDefaults from "./project-defaults";

function getConfig(configFile, cliConfig = {}) {
  const config = readConfig(configFile);

  // apply defaults, first CLI, then config file and finally project defaults
  config.projects = config.projects.map(project => {
    const projectData = {};
    Object.keys(projectDefaults).forEach(key => {
      projectData[key] = cliConfig[key] || project[key] || projectDefaults[key];
    });

    return projectData;
  });

  return config;
}

export default getConfig;
