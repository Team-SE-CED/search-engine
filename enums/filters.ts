import type { Filters } from "~/server/types/filters";

enum FilterList {
  None = "None",
  Department = "Department",
  Date = "Date",
  Author = "Author",
}

// Store FilterList in filters for easy updating and scalability without re-exporting each filter.
export const filters: Filters[] = Object.keys(FilterList).map((key) => ({
  value: FilterList[key as keyof typeof FilterList],
  label: key,
}));
