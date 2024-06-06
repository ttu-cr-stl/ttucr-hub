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
};

export interface FormComponentProps {
  control: any;
  name: string;
  options?: SelectOption[];
  label: string;
  placeholder?: string;
  extraProps?: any;
}
