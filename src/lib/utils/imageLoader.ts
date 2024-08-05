"use client";

export default function myImageLoader({ src, width, height, quality }: { src: string; width: number; height: number, quality?: number }) {
  return `https://yyccawyordfhdjblwusu.supabase.co/storage/v1/object/public/${src}?width=${width}&height=${height}&quality=${quality || 50}`;
}
