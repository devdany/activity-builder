import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PenTool, Lightbulb, CircleCheck } from "lucide-react";
import { ActivityStepActions } from "@/components/NavigationButtons";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";
import { useDarkMode } from "@/contexts/darkmode/useDarkMode";

const MAX_DESC_LENGTH = 150;

export function ActivityDescriptionStep({
  onClickContinue,
  onClickBack,
}: {
  onClickContinue: () => void;
  onClickBack: () => void;
}) {
  const { draft, setDraftDescription } = useActivityBuilder();
  const { isDark } = useDarkMode();
  const [description, setDescription] = useState<string>(draft.description);

  const length = description.length;
  const isEmpty = description.trim().length === 0;
  const isTooLong = length > MAX_DESC_LENGTH;
  const canContinue = !isEmpty && !isTooLong;

  const ratio = length / MAX_DESC_LENGTH;

  const level =
    ratio >= 1
      ? "danger"
      : ratio >= 0.9
        ? "warning-strong"
        : ratio >= 0.75
          ? "warning"
          : "safe";

  const counterColor = {
    safe: isDark ? "text-green-400" : "text-green-600",
    warning: isDark ? "text-yellow-400" : "text-yellow-600",
    "warning-strong": isDark ? "text-orange-400" : "text-orange-600",
    danger: "text-red-500",
  }[level];

  return (
    <>
      <Card
        className={`rounded-2xl border ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <PenTool className="w-6 h-6 text-orange-400" />
            <CardTitle
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Main Tasks & Responsibilities
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
              Description (required, maximum 150 characters)
            </label>

            <Textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What specific tasks did you perform? Include concrete actions, numbers, and outcomes."
              className={`
                mt-2 resize-none transition-colors
                ${
                  isDark
                    ? "bg-gray-700 text-gray-200 placeholder-gray-400"
                    : "bg-gray-50 text-gray-900"
                }
                ${
                  level === "danger"
                    ? "border-red-500"
                    : level === "warning-strong"
                      ? "border-orange-400"
                      : level === "warning"
                        ? "border-yellow-400"
                        : isDark
                          ? "border-gray-600"
                          : "border-gray-300"
                }
              `}
            />

            <div className="flex justify-between items-center text-xs mt-1">
              <span
                className={`font-medium ${
                  isTooLong ? "text-red-500" : "invisible"
                }`}
              >
                Exceeds 150 characters
              </span>

              <span className={`font-medium ${counterColor}`}>
                {description.length}
              </span>
            </div>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              isDark
                ? "bg-green-900/20 border-green-800"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <CircleCheck className="w-5 h-5 text-emerald-400 mt-0.5" />
              <div className="space-y-2">
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-green-200" : "text-green-800"
                  }`}
                >
                  ✨ Excellent Example
                </p>
                <p
                  className={`text-sm italic ${
                    isDark ? "text-green-300" : "text-green-700"
                  }`}
                >
                  Notice the specific numbers, action verbs, and concrete
                  details
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg p-4 border ${
              isDark
                ? "bg-yellow-900/20 border-yellow-800"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${
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
                  Focus on action verbs and specific tasks. Don&apos;t just say
                  what the organization does — explain what YOU did.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg border ${
              isDark ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <Button
              variant="ghost"
              className="
                w-full px-4 py-4 h-auto
                text-left
                flex items-center gap-3
                hover:bg-transparent
              "
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                  isDark ? "bg-orange-500/20" : "bg-orange-100"
                }`}
              >
                <PenTool className="w-4 h-4 text-orange-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`font-medium whitespace-normal break-words ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Need strong action verbs? Browse examples
                </div>
                <div
                  className={`text-sm mt-1 whitespace-normal break-words ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Powerful verbs to make your description stand out
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <ActivityStepActions
        continueDisabled={!canContinue}
        onClickContinue={() => {
          setDraftDescription(description);
          onClickContinue();
        }}
        onClickBack={() => {
          setDescription(draft.description);
          onClickBack();
        }}
      />
    </>
  );
}
