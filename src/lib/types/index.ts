import { z } from "zod";

export enum NavPath {
  HOME = "/",
  LEADERBOARD = "/leaderboard",
  EXPLORE = "/explore",
  WALLET = "/wallet",
  SETTINGS = "/settings",
  ONBOARDING = "/onboarding",
  LOGIN = "/login",
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

export enum OrgCategories {
  ACADEMIC = "ACADEMIC",
  TECHNOLOGY = "TECHNOLOGY",
  SERVICE = "SERVICE",
}

export const formSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(2, "First name is too short"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(2, "Last name is too short"),
  profilePic: z.string().optional(), //.url()
  major: z.nativeEnum(DegreeKeys, {
    errorMap: () => ({ message: "Please select a major" }),
  }),
  minor: z.nativeEnum(DegreeKeys, {
    errorMap: () => ({ message: "Please select a minor" }),
  }),
});