import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Users, Lightbulb } from "lucide-react";
import { ActivityStepActions } from "@/components/NavigationButtons";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";
import {
  ACTIVITY_CATEGORIES,
  type ActivityCategory,
} from "@/contexts/activity-builder/types";
import { useState } from "react";

export function ActivityCategoryStep({
  isDark,
  onClickContinue,
  onClickBack,
}: {
  isDark: boolean;
  onClickContinue: () => void;
  onClickBack: () => void;
}) {
  const { draft, setDraftCategory } = useActivityBuilder();

  const [category, setCategory] = useState<ActivityCategory | null>(
    draft.category
  );

  const canContinue = category !== null;

  return (
    <>
      <Card
        className={`rounded-2xl border ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-green-400" aria-hidden />
            <CardTitle
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Activity Type
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
              Select the category that best describes your activity
            </label>

            <Select
              value={category ?? undefined}
              onValueChange={(v: ActivityCategory) => setCategory(v)}
            >
              <SelectTrigger
                className={`
                  w-full h-12 mt-2
                  ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }
                `}
              >
                <SelectValue placeholder="Choose an activity type" />
              </SelectTrigger>

              <SelectContent>
                {ACTIVITY_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              isDark
                ? "bg-yellow-900/20 border-yellow-800"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <Lightbulb
                className="w-5 h-5 flex-shrink-0 text-yellow-500 mt-0.5"
                aria-hidden
              />
              <div className="space-y-1">
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-yellow-200" : "text-yellow-800"
                  }`}
                >
                  Tip:
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-yellow-300" : "text-yellow-700"
                  }`}
                >
                  Choose the category that colleges will use to understand your
                  activity. If you're unsure, pick the most relevant category —
                  Unni will help refine it later.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ActivityStepActions
        isDark={isDark}
        continueDisabled={!canContinue}
        onClickContinue={() => {
          if (category) {
            setDraftCategory(category);
          }
          onClickContinue();
        }}
        onClickBack={() => {
          setCategory(draft.category);
          onClickBack();
        }}
      />
    </>
  );
}
