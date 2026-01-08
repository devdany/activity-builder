import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Lightbulb } from "lucide-react";
import { ActivityStepActions } from "@/components/NavigationButtons";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";

import type { ActivityBuilderStepKey } from "@/ActivityBuilder.types";
import { api } from "@/lib/api";
import { useDarkMode } from "@/contexts/darkmode/useDarkMode";
import type { ActivityDraft } from "@/contexts/activity-builder/context";

export function ActivityTimeCommitmentStep({
  onSubmitSuccess,
  onSubmitFail,
  onClickBack,
}: {
  onSubmitSuccess: () => void;
  onSubmitFail: (step: ActivityBuilderStepKey) => void;
  onClickBack: () => void;
}) {
  const { isDark } = useDarkMode();
  const { draft, setDraftHoursPerWeek, setDraftIsLeadership, reset } =
    useActivityBuilder();

  const [hoursPerWeek, setHoursPerWeek] = useState(
    !draft.hoursPerWeek ? "" : String(draft.hoursPerWeek)
  );
  const [isLeadership, setIsLeadership] = useState(draft.isLeadership);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateFinalDraft(
    draft: ActivityDraft
  ):
    | { valid: true }
    | { valid: false; step: ActivityBuilderStepKey; message: string } {
    if (!draft.name.trim())
      return {
        valid: false,
        step: "2-1",
        message: "Activity name is required.",
      };

    if (draft.name.trim().length > 50)
      return {
        valid: false,
        step: "2-1",
        message: "Activity name must be 50 characters or less.",
      };

    if (!draft.category)
      return {
        valid: false,
        step: "2-2",
        message: "Please select an activity category.",
      };

    if (!draft.tier)
      return {
        valid: false,
        step: "2-3",
        message: "Please select an activity tier.",
      };

    if (!draft.description.trim())
      return {
        valid: false,
        step: "2-4",
        message: "Activity description is required.",
      };

    if (draft.description.length > 150)
      return {
        valid: false,
        step: "2-4",
        message: "Activity description must be 150 characters or less.",
      };

    if (
      draft.hoursPerWeek === null ||
      draft.hoursPerWeek < 0 ||
      draft.hoursPerWeek > 40
    )
      return {
        valid: false,
        step: "2-5",
        message: "Hours per week must be between 0 and 40.",
      };

    return { valid: true };
  }

  const hours = hoursPerWeek === "" ? null : Number(hoursPerWeek);

  const nextDraft = {
    ...draft,
    hoursPerWeek: hours,
    isLeadership,
  };

  const canSubmit = validateFinalDraft(nextDraft).valid;

  async function handleSubmit() {
    const validation = validateFinalDraft(nextDraft);

    if (!validation.valid) {
      alert(validation.message);
      onSubmitFail(validation.step);
      return;
    }

    try {
      setIsSubmitting(true);

      setDraftHoursPerWeek(nextDraft.hoursPerWeek!);
      setDraftIsLeadership(nextDraft.isLeadership);

      await api.post("/activities", nextDraft);
      reset();
      onSubmitSuccess();
    } catch (e) {
      console.error(e);
      alert("Save failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <Card
        className={`rounded-2xl border ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <CardTitle
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Time Commitment & Leadership
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Hours per week (0–40)
            </label>

            <Input
              value={hoursPerWeek ? hoursPerWeek : ""}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") return setHoursPerWeek("");
                if (!/^\d+$/.test(raw)) return;
                const v = Number(raw);
                if (v < 0 || v > 40) return;
                setHoursPerWeek(raw);
              }}
              placeholder="e.g., 5"
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : ""
              }
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              checked={isLeadership}
              onCheckedChange={(v) => setIsLeadership(Boolean(v))}
            />
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Leadership position
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Check if you held a leadership role
              </p>
            </div>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              isDark
                ? "bg-yellow-900/20 border-yellow-800"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
              <p
                className={`text-sm ${
                  isDark ? "text-yellow-300" : "text-yellow-700"
                }`}
              >
                Leadership and higher time commitment increase impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ActivityStepActions
        continueDisabled={!canSubmit || isSubmitting}
        continueButtonText="Submit"
        onClickContinue={handleSubmit}
        onClickBack={onClickBack}
      />
    </>
  );
}
