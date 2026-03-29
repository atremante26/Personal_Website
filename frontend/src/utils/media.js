export const MEDIA_BASE = "https://personal-website-api-yvaf.onrender.com";

export function makeMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // Already has /static/ prefix — legacy manually uploaded files
  if (path.startsWith("/static/")) {
    return `${MEDIA_BASE}${path}`;
  }

  // Everything else is a Django media upload — serve from /media/
  const cleaned = path.replace(/^\/+/, "");
  return `${MEDIA_BASE}/media/${cleaned}`;
}