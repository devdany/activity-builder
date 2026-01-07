import { createContext } from "react";
import type { ActivityCategory, ActivityTier } from "./types";

export type ActivityDraft = {
  name: string;
  category: ActivityCategory | null;
  tier: ActivityTier | null;
  description: string;
  hoursPerWeek: number | null;
  isLeadership: boolean;
};

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  tier: ActivityTier;
  description: string;
  hoursPerWeek: number;
  isLeadership: boolean;
  impactScore: number;
}

export interface ActivityBuilderContextValue {
  draft: ActivityDraft;

  setDraftName: (v: string) => void;
  setDraftCategory: (v: ActivityCategory) => void;
  setDraftTier: (v: ActivityTier) => void;
  setDraftDescription: (v: string) => void;
  setDraftHoursPerWeek: (v: number) => void;
  setDraftIsLeadership: (v: boolean) => void;

  impactScore: number;

  buildActivity: () => Omit<Activity, "id">;

  reset: () => void;
}

export const ActivityBuilderContext =
  createContext<ActivityBuilderContextValue | null>(null);
