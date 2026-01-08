import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Disc2, Lightbulb } from "lucide-react";
import { ActivityStepActions } from "@/components/NavigationButtons";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";
import { useState } from "react";
import { useDarkMode } from "@/contexts/darkmode/useDarkMode";

export function ActivityTitleStep({
  onClickContinue,
  onClickBack,
}: {
  onClickContinue: () => void;
  onClickBack?: () => void;
}) {
  const { isDark } = useDarkMode();
  const { draft, setDraftName } = useActivityBuilder();
  const [name, setName] = useState<string>(draft.name);

  const nameTrim = name.trim();
  const canContinue = nameTrim.length > 0 && nameTrim.length <= 50;
  return (
    <>
      <Card
        className={`
          rounded-2xl border
          ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}
        `}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <Disc2 className="w-6 h-6 text-blue-400" />
            <CardTitle
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Activity Title
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Varsity Soccer, Student Council"
            className={
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                : ""
            }
          />

          <div
            className={`flex items-start gap-2 text-sm ${
              isDark ? "text-yellow-300" : "text-yellow-700"
            }`}
          >
            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Use the official activity name when possible.</span>
          </div>
        </CardContent>
      </Card>

      <ActivityStepActions
        continueDisabled={!canContinue}
        onClickContinue={() => {
          setDraftName(name);
          onClickContinue();
        }}
        onClickBack={() => {
          setName(draft.name);
          onClickBack?.();
        }}
      />
    </>
  );
}
