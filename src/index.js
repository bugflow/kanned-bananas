import { runProjects } from "./run";

function kb() {
  runProjects().catch(e => {
    console.error(e);
    process.exit(1);
  });
}

export default kb;
