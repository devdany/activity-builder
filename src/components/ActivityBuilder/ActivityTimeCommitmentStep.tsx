import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Lightbulb } from "lucide-react";
import { ActivityStepActions } from "@/components/NavigationButtons";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";

export function ActivityTimeCommitmentStep({
  isDark,
  onClickContinue,
  onClickBack,
}: {
  isDark: boolean;
  onClickContinue: () => void;
  onClickBack: () => void;
}) {
  const { draft, setDraftHoursPerWeek, setDraftIsLeadership } =
    useActivityBuilder();
  const [hoursPerWeek, setHoursPerWeek] = useState<string>(
    draft.hoursPerWeek === null ? "" : String(draft.hoursPerWeek)
  );
  const [isLeadership, setIsLeadership] = useState<boolean>(draft.isLeadership);

  const isValidHours =
    hoursPerWeek !== "" &&
    Number(hoursPerWeek) >= 0 &&
    Number(hoursPerWeek) <= 40;

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
          {/* Hours per week */}
          <div className="space-y-2">
            <label
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Hours per week (0–40)
            </label>

            <Input
              value={hoursPerWeek}
              onChange={(e) => {
                const raw = e.target.value;

                if (raw === "") {
                  setHoursPerWeek("");
                  return;
                }

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

          {/* Leadership */}
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
                Check if you held a leadership role in this activity
              </p>
            </div>
          </div>

          {/* Tip */}
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
                Leadership roles and higher time commitment increase your
                overall impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ActivityStepActions
        isDark={isDark}
        continueDisabled={!isValidHours}
        continueButtonText="Submit"
        onClickContinue={() => {
          if (hoursPerWeek) {
            setDraftHoursPerWeek(Number(hoursPerWeek));
          }

          setDraftIsLeadership(isLeadership);

          // TODO: 저장 api 호출
          onClickContinue();
        }}
        onClickBack={() => {
          setHoursPerWeek(
            draft.hoursPerWeek === null ? "" : String(draft.hoursPerWeek)
          );
          setIsLeadership(draft.isLeadership);
          onClickBack();
        }}
      />
    </>
  );
}
