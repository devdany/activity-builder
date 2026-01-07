export const ACTIVITY_CATEGORIES = [
  "Sports",
  "Arts",
  "Academic",
  "Community Service",
  "Leadership",
  "Other",
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];

export const ACTIVITY_TIERS = [
  "School",
  "Regional",
  "State",
  "National",
  "International",
] as const;

export type ActivityTier = (typeof ACTIVITY_TIERS)[number];
