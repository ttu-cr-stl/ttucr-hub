import { SelectOption } from "../types";
import { Degree } from "./consts";


export const isTTUEmail = (email: string) => /@ttu\.edu/.test(email);

export const extractUsername = (email: string) => email.split("@")[0];

export const getDegreeByKey = (key: SelectOption['value']) => Degree[Degree.map((d) => d.value).indexOf(key)]