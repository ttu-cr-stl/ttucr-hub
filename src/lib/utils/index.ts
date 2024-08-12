import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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

const resizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const maxWidth = 1024;
    const maxHeight = 1024;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (aspectRatio > 1) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        } else {
          reject(new Error("Canvas to Blob conversion failed"));
        }
      }, file.type);
    };
    img.onerror = (error) => reject(error);
    img.src = URL.createObjectURL(file);
  });
};

export const uploadProfileImage = async (file: File, username: string) => {
  console.log("Uploading profile image");

  const supabase = createClientComponentClient();
  const bucket = "users";

  // Check if the file already exists
  const { data: existingFileData, error: existingFileError } =
    await supabase.storage.from(bucket).list("", {
      search: `users/${username}`,
    });

  if (existingFileError) {
    console.log(existingFileError);
    throw new Error("Failed to check existing file");
  }

  if (existingFileData && existingFileData.length > 0) {
    // File exists, delete it
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove([`users/${username}`]);

    console.log("Deleting existing file");

    if (deleteError) {
      console.log(deleteError);
      throw new Error("Failed to delete existing file");
    }
  }

  const { data: existingFileData2, error: existingFileError2 } =
    await supabase.storage.from(bucket).list("", {
      search: `users/${username}`,
    });

  if (existingFileError) {
    console.log(existingFileError);
    throw new Error("Failed to check existing file");
  }

  if (existingFileData2 && existingFileData2.length > 0) {
    console.log("Failed to delete existing file");
    throw new Error("Failed to delete existing file");
  }

  console.log("Resizing image");
  const resizedFile = await resizeImage(file);

  // Upload the resized file
  const { data, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(`users/${username}`, resizedFile, {
      upsert: true,
    });
  console.log("Uploading image");

  if (uploadError) {
    console.log(uploadError);
    throw new Error("Failed to upload image");
  }

  return data.fullPath;
};
