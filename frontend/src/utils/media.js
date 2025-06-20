export const MEDIA_BASE = "https://personal-website-api-yvaf.onrender.com";

export function makeMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // Remove leading slashes and /media/ prefix if present
  const cleanedPath = path.replace(/^\/?media\/?/, "").replace(/^\/+/, "");
  return `${MEDIA_BASE}/static/${cleanedPath}`;
}