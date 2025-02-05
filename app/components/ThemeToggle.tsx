import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

import { useThemeStore } from "~/store/themeStore/themeStore";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, storageKey, setTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  const themeButton =
    theme === "dark" ? (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-foreground "
        onClick={() => setTheme("light")}
      >
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-foreground "
        onClick={() => setTheme("dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </Button>
    );
  return themeButton;
}
