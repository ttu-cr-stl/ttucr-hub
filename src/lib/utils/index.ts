

export const isTTUEmail = (email: string) => /@ttu\.edu/.test(email);

export const extractUsername = (email: string) => email.split("@")[0];