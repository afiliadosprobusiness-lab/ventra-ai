const LANDING_THEME_STORAGE_KEY = "ventra:landing-theme";

export function getInitialLandingDarkMode() {
  if (typeof window === "undefined") return false;

  const storedTheme = window.localStorage.getItem(LANDING_THEME_STORAGE_KEY);
  if (storedTheme === "dark") return true;
  if (storedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function persistLandingTheme(isDarkMode: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANDING_THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
}
