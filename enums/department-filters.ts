import type { Filters } from "~/types/filters";

enum DepartmentList {
  Architecture = "Architecture",
  CivilEngineering = "Civil Engineering",
  ComputerEngineering = "Computer Engineering",
  ElectricalEngineering = "Electrical Engineering",
  MechanicalEngineering = "Mechanical Engineering",
}

// Store FilterList in filters for easy updating and scalability without re-exporting each filter.
export const filters: Filters[] = Object.keys(DepartmentList).map((key) => ({
  value: DepartmentList[key as keyof typeof DepartmentList],
  label: key,
}));
