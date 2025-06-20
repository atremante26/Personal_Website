export const MEDIA_BASE = "https://personal-website-api-yvaf.onrender.com";

export function makeMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${MEDIA_BASE}/${path.replace(/^\/+/, "")}`;
}