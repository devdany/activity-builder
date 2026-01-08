import { useMemo, useState } from "react";

import { ActivitySidebar } from "@/components/SideBar";
import type { ActivityBuilderStepKey } from "@/ActivityBuilder.types";

import { ActivityTitleStep } from "./ActivityTitleStep";
import { ActivityCategoryStep } from "./ActivityCategoryStep";
import { ActivityTierStep } from "./ActivityTierStep";
import { ActivityDescriptionStep } from "./ActivityDescriptionStep";
import { ActivityTimeCommitmentStep } from "./ActivityTimeCommitmentStep";
import { ActivitySummaryStep } from "./ActivitySummaryStep";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";
import { ImpactBadge } from "../ImpactBadge";
import { useDarkMode } from "@/contexts/darkmode/useDarkMode";

export function ActivityBuilder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { impactScore } = useActivityBuilder();
  const [step, setStep] = useState<ActivityBuilderStepKey>("2-1");

  const stepContent = useMemo(() => {
    switch (step) {
      case "2-1":
        return (
          <ActivityTitleStep
            onClickContinue={() => {
              setStep("2-2");
            }}
          />
        );

      case "2-2":
        return (
          <ActivityCategoryStep
            onClickContinue={() => {
              setStep("2-3");
            }}
            onClickBack={() => {
              setStep("2-1");
            }}
          />
        );

      case "2-3":
        return (
          <ActivityTierStep
            onClickContinue={() => {
              setStep("2-4");
            }}
            onClickBack={() => {
              setStep("2-2");
            }}
          />
        );

      case "2-4":
        return (
          <ActivityDescriptionStep
            onClickContinue={() => {
              setStep("2-5");
            }}
            onClickBack={() => {
              setStep("2-3");
            }}
          />
        );

      case "2-5":
        return (
          <ActivityTimeCommitmentStep
            onSubmitSuccess={() => {
              setStep("3-1");
            }}
            onSubmitFail={(step) => {
              setStep(step);
            }}
            onClickBack={() => {
              setStep("2-4");
            }}
          />
        );

      case "3-1":
        return <ActivitySummaryStep />;

      default:
        return null;
    }
  }, [step]);

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
    >
      <header
        className={`
          sticky top-0 z-30
          flex items-center justify-between
          h-12 px-4 sm:h-14
          border-b
          transition-colors
          ${
            isDark
              ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700"
              : "bg-gradient-to-r from-white via-gray-50 to-white border-gray-200"
          }
        `}
      >
        <div className="flex items-center min-w-0">
          <button
            className={`sm:hidden mr-2 p-2 rounded transition-colors
              ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
            aria-label="Open steps menu"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            ☰
          </button>

          <h1
            className={`text-sm font-semibold sm:text-base truncate ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Activity Builder
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={`
              p-2 rounded-full transition-all
              ${
                isDark
                  ? "text-yellow-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      <div className="relative md:flex">
        <ActivitySidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentStep={step}
          onStepClick={(step) => {
            setIsSidebarOpen(false);
            setStep(step);
          }}
        />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-3xl flex flex-col gap-4">
            {step !== "3-1" && <ImpactBadge impactScore={impactScore} />}

            {stepContent}
          </div>
        </main>
      </div>
    </div>
  );
}
