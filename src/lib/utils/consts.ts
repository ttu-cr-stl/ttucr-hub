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
    color: "#008080",
  },
  {
    name: "Electrical Engr.",
    value: DegreeKeys.EE,
    color: "#0070FF",
  },
  {
    name: "Industrial Engr.",
    value: DegreeKeys.IE,
    color: "#7A7A7A",
  },
  {
    name: "Mathematics",
    value: DegreeKeys.MATH,
    color: "#800080",
  },
  {
    name: "RHIM",
    value: DegreeKeys.RHIM,
    color: "#FF1493",
  },
  {
    name: "Retail",
    value: DegreeKeys.RETAIL,
    color: "#FF7F50",
  },
  {
    name: "Business",
    value: DegreeKeys.BUSINESS,
    color: "#000080",
  },
  {
    name: "Staff",
    value: DegreeKeys.STAFF,
    color: "#9C4544",
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
  extraProps?: any;
}