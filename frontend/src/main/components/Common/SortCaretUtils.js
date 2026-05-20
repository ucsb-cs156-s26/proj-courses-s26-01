export function getSortCaret(header) {
  if (!header.column.getCanSort()) return "";
  if (header.column.getIsSorted() === "asc") {
    return "🔼";
  }
  if (header.column.getIsSorted() === "desc") {
    return "🔽";
  }
  return "";
}
