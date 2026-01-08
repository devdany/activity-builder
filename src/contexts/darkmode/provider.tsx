import { useState } from "react";
import { DarkModeContext } from "./context";

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => setIsDark((prev) => !prev);
  const setDarkMode = (value: boolean) => setIsDark(value);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
