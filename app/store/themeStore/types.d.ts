export type Theme = "dark" | "light";

export interface ThemeState {
  defaultTheme: Theme;
  storageKey: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
