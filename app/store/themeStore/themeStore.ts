import { create } from "zustand";
import { Theme, ThemeState } from "./types";

export const useThemeStore = create<ThemeState>()((set) => ({
  storageKey: "ui-theme",
  theme:
    typeof window !== "undefined"
      ? (localStorage.getItem("ui-theme") as Theme) || "dark"
      : "dark",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("ui-theme", theme);
  },
}));
