import type { Filters } from "~/server/types/filters";

enum FilterList {
  Department = "Department",
  Date = "Date",
  Author = "Author",
}

//Store FilterList in filters
export const filters: Filters[] = Object.keys(FilterList).map((key) => ({
  value: FilterList[key as keyof typeof FilterList],
  label: key,
}));
