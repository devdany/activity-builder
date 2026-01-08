import { useMemo } from "react";
import type {
  ActivityBuilderStep,
  ActivityBuilderStepKey,
} from "@/ActivityBuilder.types";
import { useActivityBuilder } from "@/contexts/activity-builder/useActivityBuilder";
import type { ActivityDraft } from "@/contexts/activity-builder/context";

function isStepCompleted(
  step: ActivityBuilderStepKey,
  draft: ActivityDraft
): boolean {
  switch (step) {
    case "2-1":
      return draft.name.trim().length > 0;

    case "2-2":
      return draft.category !== null;

    case "2-3":
      return draft.tier !== null;

    case "2-4":
      return draft.description.trim().length > 0;

    case "2-5":
      return draft.hoursPerWeek !== null;

    case "3-1":
      return true;

    default:
      return false;
  }
}

const STEP_DEFS: Omit<ActivityBuilderStep, "enabled">[] = [
  {
    step: "2-1",
    title: "Activity Title",
    description: "Enter the name of your activity",
  },
  {
    step: "2-2",
    title: "Activity Type",
    description: "Select the activity category",
  },
  {
    step: "2-3",
    title: "Activity Tier",
    description: "Choose the level of recognition",
  },
  {
    step: "2-4",
    title: "Activity Description",
    description: "Describe what you did",
  },
  {
    step: "2-5",
    title: "Time & Leadership",
    description: "Hours per week and leadership role",
  },
  {
    step: "3-1",
    title: "Activity List",
    description: "Review, edit, or remove your activities",
  },
];

interface ActivitySidebarProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  currentStep?: ActivityBuilderStepKey;
  onStepClick?: (step: ActivityBuilderStepKey) => void;
}

export function ActivitySidebar({
  isDark,
  isOpen,
  onClose,
  currentStep,
  onStepClick,
}: ActivitySidebarProps) {
  const { draft } = useActivityBuilder();

  const steps = useMemo<ActivityBuilderStep[]>(() => {
    return STEP_DEFS.map((stepDef, index) => {
      if (stepDef.step === "3-1") {
        return {
          ...stepDef,
          enabled: true,
        };
      }

      const enabled = STEP_DEFS.slice(0, index).every((prev) =>
        isStepCompleted(prev.step, draft)
      );

      return {
        ...stepDef,
        enabled,
      };
    });
  }, [draft]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-64
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
          border-r
          ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
        `}
        role="complementary"
        aria-label="Activity Builder steps"
      >
        <nav className="px-3 py-4 overflow-y-auto">
          <ol className="space-y-1">
            {steps.map(({ step, title, description, enabled }) => {
              const isActive = step === currentStep;

              return (
                <li key={step}>
                  <button
                    type="button"
                    disabled={!enabled}
                    onClick={() => enabled && onStepClick?.(step)}
                    className={`
                      w-full text-left rounded-md p-2
                      transition-colors
                      ${
                        enabled
                          ? isDark
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-50"
                          : "opacity-50 cursor-not-allowed"
                      }
                      ${
                        isActive ? (isDark ? "bg-gray-800" : "bg-gray-100") : ""
                      }
                    `}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="text-xs text-gray-400">{step}</div>
                    <div className="text-sm font-medium">{title}</div>
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {description}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>
    </>
  );
}
