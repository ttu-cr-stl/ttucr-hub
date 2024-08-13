import { Degree } from "./consts";

export const isTTUEmail = (email: string) => /@ttu\.edu/.test(email);

export const extractUsername = (email: string) => email.split("@")[0];

export const getDegreeByKey = (key: string) =>
  Degree.find((degree) => degree.value === key);

export const detectOS = () => {
  let userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
};

export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         ('standalone' in window.navigator && window.navigator.standalone) ||
         document.referrer.includes('android-app://');
};