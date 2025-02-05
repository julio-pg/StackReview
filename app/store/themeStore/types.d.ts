export type Theme = "dark" | "light";

export interface ThemeState {
  storageKey: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
