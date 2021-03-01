import { csvByColumn } from "./filter";

function stocksCSV({ issues, project }) {
  const csv = csvByColumn({
    columns: project.includedColumns,
    issues,
  });

  return `${csv}\n`; // add trailing newline
}

export default stocksCSV;
