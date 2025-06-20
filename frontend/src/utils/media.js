export const MEDIA_BASE = "https://personal-website-api-yvaf.onrender.com";

export function makeMediaUrl(path) {
  if (!path) return "";

  // If it's a broken full URL that contains `/media/`, fix it
  if (path.startsWith("http") && path.includes("/media/")) {
    const cleaned = path.split("/media/")[1]; // everything after /media/
    return `${MEDIA_BASE}/static/${cleaned.replace(/^\/+/, "")}`;
  }

  // If it's already a correct full URL
  if (path.startsWith("http")) return path;

  // Clean relative paths too
  const cleaned = path
    .replace(/^\/?media\/?/, "")
    .replace(/^\/?static\/?/, "")
    .replace(/^\/+/, "");

  return `${MEDIA_BASE}/static/${cleaned}`;
}
