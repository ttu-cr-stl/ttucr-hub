"use client";

const SUPABASE_URL = "https://yyccawyordfhdjblwusu.supabase.co/storage/v1/object/public/";

export default function myImageLoader({
  src,
  width,
  height,
  quality,
}: {
  src: string;
  width: number;
  height: number;
  quality?: number;
}) {
  // If it's already a full Supabase URL, extract the path
  if (src.startsWith(SUPABASE_URL)) {
    src = src.replace(SUPABASE_URL, "");
  }

  // If it's some other external URL, return it as is
  if (src.startsWith("http")) {
    return src;
  }

  // Remove any query parameters if they exist
  src = src.split("?")[0];

  // Construct the full URL with our parameters
  return `${SUPABASE_URL}${src}?width=${width}&height=${height}&quality=${quality || 75}`;
}
