import { useContext } from "react";
import { DarkModeContext } from "./context";

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return ctx;
}
