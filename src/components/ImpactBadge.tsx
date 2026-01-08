import { Badge } from "@/components/ui/badge";
import { useDarkMode } from "@/contexts/darkmode/useDarkMode";

interface ImpactBadgeProps {
  impactScore: number;
}

export function ImpactBadge({ impactScore }: ImpactBadgeProps) {
  const { isDark } = useDarkMode();

  let label = "Low";
  let className = isDark
    ? "bg-gray-800 text-gray-300"
    : "bg-gray-100 text-gray-700";

  if (impactScore >= 7) {
    label = "Exceptional";
    className = isDark
      ? "bg-purple-900/30 text-purple-300"
      : "bg-purple-100 text-purple-700";
  } else if (impactScore >= 5) {
    label = "High";
    className = isDark
      ? "bg-green-900/30 text-green-300"
      : "bg-green-100 text-green-700";
  } else if (impactScore >= 3) {
    label = "Medium";
    className = isDark
      ? "bg-yellow-900/30 text-yellow-300"
      : "bg-yellow-100 text-yellow-700";
  }

  return <Badge className={className}>{label}</Badge>;
}
