import { Button } from "./ui/button";

interface ActivityStepActionsProps {
  isDark: boolean;
  backDisabled?: boolean;
  continueDisabled?: boolean;
  onClickBack?: () => void;
  onClickContinue?: () => void;
  continueButtonText?: string;
}

export function ActivityStepActions({
  isDark,
  backDisabled = false,
  continueDisabled = false,
  onClickBack,
  onClickContinue,
  continueButtonText = "Continue",
}: ActivityStepActionsProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <Button
        variant="outline"
        disabled={backDisabled}
        onClick={onClickBack}
        className={`
          inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
          transition-colors
          ${
            backDisabled
              ? isDark
                ? "bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-400 cursor-not-allowed"
              : isDark
                ? "bg-transparent border-gray-600 text-gray-300"
                : "bg-transparent border-gray-300 text-gray-600"
          }
          hover:bg-gray-700
          dark:hover:bg-gray-700/40
          hover:text-current
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Button>

      <Button
        disabled={continueDisabled}
        className={`
          inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
          ${
            continueDisabled
              ? "bg-blue-600 text-white opacity-60 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
        onClick={onClickContinue}
      >
        {continueButtonText}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
}
