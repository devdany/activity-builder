import { useMemo, useState } from "react";
import { ActivityBuilderContext } from "./context";
import type { ActivityDraft, Activity } from "./context";
import type { ActivityTier } from "./types";

export function ActivityBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<ActivityDraft>({
    name: "",
    category: null,
    tier: null,
    description: "",
    hoursPerWeek: null,
    isLeadership: false,
  });

  function calculateImpactScore(draft: ActivityDraft): number {
    let score = 0;

    if (draft.tier) {
      const tierScoreMap: Record<ActivityTier, number> = {
        School: 1,
        Regional: 2,
        State: 3,
        National: 4,
        International: 5,
      };

      score += tierScoreMap[draft.tier];
    }

    if (draft.isLeadership) score += 2;
    if (draft.hoursPerWeek && draft.hoursPerWeek > 10) score += 1;

    return score;
  }

  const impactScore = useMemo(() => calculateImpactScore(draft), [draft]);

  function buildActivity(): Omit<Activity, "id"> {
    if (!draft.category || !draft.tier) {
      throw new Error("Activity draft is incomplete");
    }

    return {
      name: draft.name,
      category: draft.category,
      tier: draft.tier,
      description: draft.description,
      hoursPerWeek: draft.hoursPerWeek ?? 0,
      isLeadership: draft.isLeadership,
      impactScore,
    };
  }

  function reset() {
    setDraft({
      name: "",
      category: null,
      tier: null,
      description: "",
      hoursPerWeek: 0,
      isLeadership: false,
    });
  }

  return (
    <ActivityBuilderContext.Provider
      value={{
        draft,
        impactScore,

        setDraftName: (name) => setDraft((d) => ({ ...d, name })),
        setDraftCategory: (category) => setDraft((d) => ({ ...d, category })),
        setDraftTier: (tier) => setDraft((d) => ({ ...d, tier })),
        setDraftDescription: (description) =>
          setDraft((d) => ({ ...d, description })),
        setDraftHoursPerWeek: (hoursPerWeek) =>
          setDraft((d) => ({ ...d, hoursPerWeek })),
        setDraftIsLeadership: (isLeadership) =>
          setDraft((d) => ({ ...d, isLeadership })),

        buildActivity,
        reset,
      }}
    >
      {children}
    </ActivityBuilderContext.Provider>
  );
}
