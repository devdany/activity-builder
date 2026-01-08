import { createContext } from "react";

interface DarkModeContextValue {
  isDark: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined
);
