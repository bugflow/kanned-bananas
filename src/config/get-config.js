import readConfig from "./read-config";
import projectDefaults from "./project-defaults";

function getConfig(configFile, cliConfig = {}) {
  const config = readConfig(configFile);

  // apply config: CLI > project file config > top level file config > defaults
  config.projects = config.projects.map(project => {
    const projectData = {};
    Object.keys(projectDefaults).forEach(key => {
      projectData[key] =
        cliConfig[key] || project[key] || config[key] || projectDefaults[key];
    });

    return projectData;
  });

  return config;
}

export default getConfig;
