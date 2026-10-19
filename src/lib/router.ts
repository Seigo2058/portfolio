import { useSyncExternalStore } from "react";

export type Route =
  | { name: "home"; section?: string }
  | { name: "aboutMe" }
  | { name: "work"; slug: string };

/** Hash-based paths: `#/`, `#/works` (home, scrolled to works), `#/works/:slug`. */
export const paths = {
  home: "#/",
  works: "#/works",
  aboutMe: "#/aboutMe",
  contact: "#/contact",
  work: (slug: string) => `#/works/${slug}`,
};

function parse(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const work = path.match(/^\/works\/([\w-]+)\/?$/);
  if (work) return { name: "work", slug: work[1] };
  // Old #/about links still resolve.
  if (/^\/about(Me)?\/?$/.test(path)) return { name: "aboutMe" };
  const section = path.match(/^\/(works|contact)\/?$/);
  if (section) return { name: "home", section: section[1] };
  return { name: "home" };
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export function useHash() {
  return useSyncExternalStore(subscribe, () => window.location.hash);
}

export function useRoute(): Route {
  return parse(useHash());
}

/** Re-apply a route's scroll position (used when a link targets the current hash). */
export function rescroll(hash: string) {
  const route = parse(hash);
  const target =
    route.name === "home" && route.section
      ? document.getElementById(route.section)
      : null;
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
