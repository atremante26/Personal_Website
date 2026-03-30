export const MEDIA_BASE = "https://personal-website-api-yvaf.onrender.com";

export function makeMediaUrl(path) {
  if (!path) return "";

  // Fix full URLs with /media/static/ — strip /media/ and serve from /static/
  if (path.includes("/media/static/")) {
    return path.replace("/media/static/", "/static/");
  }

  // Full URL with /media/ but not /static/ — it's a real media upload
  if (path.startsWith("http")) return path;

  // Raw path starting with /static/
  if (path.startsWith("/static/")) {
    return `${MEDIA_BASE}${path}`;
  }

  // Raw relative path — Django media upload
  const cleaned = path.replace(/^\/+/, "");
  if (cleaned.startsWith("static/")) {
    return `${MEDIA_BASE}/${cleaned}`;
  }

  return `${MEDIA_BASE}/media/${cleaned}`;
}