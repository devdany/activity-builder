import type {
  ActivityBuilderStep,
  ActivityBuilderStepKey,
} from "@/ActivityBuilder.types";

const STEPS: ActivityBuilderStep[] = [
  {
    step: "2-1",
    title: "Activity Title",
    description: "Enter the name of your activity",
    enabled: true,
  },
  {
    step: "2-2",
    title: "Activity Type",
    description: "Select the activity category",
    enabled: true,
  },
  {
    step: "2-3",
    title: "Activity Tier",
    description: "Choose the level of recognition",
    enabled: true,
  },
  {
    step: "2-4",
    title: "Activity Description",
    description: "Describe what you did (min 150 chars)",
    enabled: true,
  },
  {
    step: "2-5",
    title: "Time & Leadership",
    description: "Hours per week and leadership role",
    enabled: true,
  },
  {
    step: "3-1",
    title: "Activity List",
    description: "Review, edit, or remove your activities",
    enabled: true,
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
        <nav className="px-3 py-4 overflow-y-auto" aria-label="Builder steps">
          <ol className="space-y-1">
            {STEPS.map(({ step, title, description, enabled }) => {
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
