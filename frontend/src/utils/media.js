export const MEDIA_BASE = "https://personal-website-api-yvaf.onrender.com";

export function makeMediaUrl(path) {
  if (!path) return "";

  // Fix full URLs that wrongly contain `/media/`
  if (path.startsWith("http") && path.includes("/media/")) {
    const cleaned = path.split("/media/")[1];
    return `${MEDIA_BASE}/static/${cleaned.replace(/^static\//, "")}`;
  }

  // If it's already a valid full URL and not broken
  if (path.startsWith("http")) return path;

  // Clean relative paths
  const cleaned = path
    .replace(/^\/?media\/?/, "")   // remove leading media/
    .replace(/^\/?static\/?/, "")  // remove leading static/
    .replace(/^\/+/, "");          // remove any leading slashes

  return `${MEDIA_BASE}/static/${cleaned}`;
}