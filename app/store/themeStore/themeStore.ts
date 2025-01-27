import { create } from "zustand";
import { ThemeState } from "./types";

export const useThemeStore = create<ThemeState>()((set) => ({
  defaultTheme: "dark",
  storageKey: "ui-theme",
  theme: "dark",
  setTheme: (theme) => {
    set({ theme });
  },
}));
