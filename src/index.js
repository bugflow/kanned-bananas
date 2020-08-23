import { runProjects } from "./run";

function kb() {
  runProjects().catch(e => console.error(e));
}

export default kb;
