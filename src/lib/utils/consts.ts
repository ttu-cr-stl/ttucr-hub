export enum NavPath {
  HOME = "/",
  LEADERBOARD = "/leaderboard",
  EXPLORE = "/explore",
  WALLET = "/wallet",
  SETTINGS = "/settings",
  ONBOARDING = "/onboarding",
}

export enum DegreeKeys {
  CS = "CS",
  EE = "EE",
  IE = "IE",
  MATH = "MATH",
  RHIM = "RHIM",
  RETAIL = "RETAIL",
  BUSINESS = "BUSINESS",
  STAFF = "STAFF",
  NONE = "NONE",
}

export type SelectOption = {
  name: string;
  value: DegreeKeys;
  color: string;
}

export const Degree: SelectOption[] = [
  {
    name: "Computer Science",
    value: DegreeKeys.CS,
    color: "#9C4544",
  },
  {
    name: "Electrical Engineering",
    value: DegreeKeys.EE,
    color: "#FFA500",
  },
  {
    name: "Industrial Engineering",
    value: DegreeKeys.IE,
    color: "#FF6347",
  },
  {
    name: "Mathematics",
    value: DegreeKeys.MATH,
    color: "#FF69B4",
  },
  {
    name: "Recreation, Hospitality, and Institutional Management",
    value: DegreeKeys.RHIM,
    color: "#FF1493",
  },
  {
    name: "Retail",
    value: DegreeKeys.RETAIL,
    color: "#FF00FF",
  },
  {
    name: "Business",
    value: DegreeKeys.BUSINESS,
    color: "#FF4500",
  },
  {
    name: "Staff",
    value: DegreeKeys.STAFF,
    color: "#FF0000",
  },
  {
    name: "None or Undeclared",
    value: DegreeKeys.NONE,
    color: "#000000",
  },
];

export interface FormComponentProps {
  control: any;
  name: string;
  options?: SelectOption[];
  label: string;
  placeholder?: string;
  type?: string;
}