export const CATEGORY_VALUES = [
  "Sports",
  "Arts",
  "Academic",
  "Community Service",
  "Leadership",
  "Other",
];

export const TIER_SCORE_MAP = {
  School: 1,
  Regional: 2,
  State: 3,
  National: 4,
  International: 5,
} as const;

export type ActivityCategory = (typeof CATEGORY_VALUES)[number];
export type ActivityTier = keyof typeof TIER_SCORE_MAP;

export type ActivityInput = {
  name?: unknown;
  category?: unknown;
  tier?: unknown;
  description?: unknown;
  hoursPerWeek?: unknown;
  isLeadership?: unknown;
};

export type ValidatedActivity = {
  name?: string;
  category?: ActivityCategory;
  tier?: ActivityTier;
  description?: string;
  hoursPerWeek?: number;
  isLeadership?: boolean;
};

export type ExistingActivityRow = {
  tier: ActivityTier;
  hoursPerWeek: number;
  isLeadership: 0 | 1;
};

export type ImpactScoreParams = {
  tier: ActivityTier;
  hoursPerWeek: number;
  isLeadership: boolean;
};

export type Activity = {
  id: string;
  name: string;
  category: string;
  tier: string;
  description: string;
  hoursPerWeek: number;
  isLeadership: boolean;
  impactScore: number;
};
