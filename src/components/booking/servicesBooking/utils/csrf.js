
export function getCsrfToken() {
  const name = "csrf-token";
  const decoded = decodeURIComponent(document.cookie || "");
  const cookies = decoded.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return "";
}
