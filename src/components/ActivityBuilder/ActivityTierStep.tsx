import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Award, Lightbulb } from "lucide-react";
import { ActivityStepActions } from "@/components/NavigationButtons";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";
import {
  ACTIVITY_TIERS,
  type ActivityTier,
} from "@/contexts/activity-builder/types";

export function ActivityTierStep({
  isDark,
  onClickContinue,
  onClickBack,
}: {
  isDark: boolean;
  onClickContinue: () => void;
  onClickBack: () => void;
}) {
  const { draft, setDraftTier } = useActivityBuilder();
  const [tier, setTier] = useState<ActivityTier | null>(draft.tier);

  const canContinue = tier !== null;
  return (
    <>
      <Card
        className={`rounded-2xl border ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-400" />
            <CardTitle
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Activity Tier
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
              What level was this activity?
            </label>

            <Select
              value={tier ?? undefined}
              onValueChange={(v: ActivityTier) => setTier(v)}
            >
              <SelectTrigger
                className={`w-full h-12 mt-2 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                <SelectValue placeholder="Select activity tier" />
              </SelectTrigger>

              <SelectContent>
                {ACTIVITY_TIERS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
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
              <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
              <p
                className={`text-sm ${
                  isDark ? "text-yellow-300" : "text-yellow-700"
                }`}
              >
                Higher tiers generally indicate broader impact and recognition.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ActivityStepActions
        isDark={isDark}
        continueDisabled={!canContinue}
        onClickContinue={() => {
          if (tier) {
            setDraftTier(tier);
          }
          onClickContinue();
        }}
        onClickBack={() => {
          setTier(draft.tier);
          onClickBack();
        }}
      />
    </>
  );
}
