import { useContext } from "react";
import { ActivityBuilderContext } from "./context";

export function useActivityBuilder() {
  const ctx = useContext(ActivityBuilderContext);

  if (!ctx) {
    throw new Error(
      "useActivityBuilder must be used within ActivityBuilderProvider"
    );
  }

  return ctx;
}
