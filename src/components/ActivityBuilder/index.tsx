import { useMemo, useState } from "react";

import { Badge } from "../ui/badge";

import { ActivitySidebar } from "@/components/SideBar";
import type { ActivityBuilderStepKey } from "@/ActivityBuilder.types";

import { ActivityTitleStep } from "./ActivityTitleStep";
import { ActivityCategoryStep } from "./ActivityCategoryStep";
import { ActivityTierStep } from "./ActivityTierStep";
import { ActivityDescriptionStep } from "./ActivityDescriptionStep";
import { ActivityTimeCommitmentStep } from "./ActivityTimeCommitmentStep";
import { ActivitySummaryStep } from "./ActivitySummaryStep";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";

interface ActivityBuilderProps {
  isDark: boolean;
}

export function ActivityBuilder({ isDark }: ActivityBuilderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { impactScore } = useActivityBuilder();
  const [step, setStep] = useState<ActivityBuilderStepKey>("2-1");

  const impactBadge = useMemo(() => {
    if (impactScore >= 7) {
      return {
        label: "Exceptional Impact",
        color: isDark
          ? "bg-purple-900/30 text-purple-300"
          : "bg-purple-100 text-purple-700",
      };
    }
    if (impactScore >= 5) {
      return {
        label: "High Impact",
        color: isDark
          ? "bg-green-900/30 text-green-300"
          : "bg-green-100 text-green-700",
      };
    }
    if (impactScore >= 3) {
      return {
        label: "Medium Impact",
        color: isDark
          ? "bg-yellow-900/30 text-yellow-300"
          : "bg-yellow-100 text-yellow-700",
      };
    }
    return {
      label: "Low Impact",
      color: isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700",
    };
  }, [impactScore, isDark]);

  const stepContent = useMemo(() => {
    switch (step) {
      case "2-1":
        return (
          <ActivityTitleStep
            isDark={isDark}
            onClickContinue={() => {
              setStep("2-2");
            }}
          />
        );

      case "2-2":
        return (
          <ActivityCategoryStep
            isDark={isDark}
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
            isDark={isDark}
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
            isDark={isDark}
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
            isDark={isDark}
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
        return <ActivitySummaryStep isDark={isDark} />;

      default:
        return null;
    }
  }, [step, isDark]);

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
    >
      <header
        className={`sticky top-0 z-30 flex items-center justify-between h-12 px-4 border-b ${
          isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        } sm:h-14`}
      >
        <div className="flex items-center min-w-0">
          <button
            className={`sm:hidden mr-2 p-2 rounded ${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-black"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="Open steps menu"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            ☰
          </button>

          <h1 className="text-sm font-semibold sm:text-base truncate">
            Activity Builder
          </h1>
        </div>
      </header>
      <div className="relative md:flex">
        <ActivitySidebar
          isDark={isDark}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentStep={step}
          onStepClick={(step) => {
            setIsSidebarOpen(false);
            setStep(step);
          }}
        />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-3xl">
            {step !== "3-1" && (
              <Badge
                className={`
                  ${impactBadge.color}
                  flex items-center gap-1
                  text-xs sm:text-sm
                  mb-6
                `}
              >
                {impactBadge.label}
                <span className="font-semibold">{impactScore}</span>
              </Badge>
            )}

            {stepContent}
          </div>
        </main>
      </div>
    </div>
  );
}
