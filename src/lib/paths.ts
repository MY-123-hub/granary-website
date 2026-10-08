/** Keep local previews at / and published project sites under their Pages base. */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function sitePath(path: string): string {
  return path.startsWith("/") && !path.startsWith("//")
    ? `${base}${path}`
    : path;
}

export function routePath(pathname: string): string {
  return base && pathname.startsWith(`${base}/`)
    ? pathname.slice(base.length)
    : pathname;
}
