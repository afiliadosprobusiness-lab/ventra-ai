const THEME_STORAGE_KEY = "ventra:theme";

export function getInitialThemeMode() {
  if (typeof window === "undefined") return false;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark") return true;
  if (storedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function persistThemeMode(isDarkMode: boolean) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
}
