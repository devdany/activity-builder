import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ActivityEditModal } from "./ActivityEditModal";
import { ImpactBadge } from "../ImpactBadge";
import { useDarkMode } from "@/contexts/darkmode/useDarkMode";

export interface ActivitySummaryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tier: string;
  hoursPerWeek: number;
  isLeadership: boolean;
  impactScore: number;
}

export function ActivitySummaryStep() {
  const { isDark } = useDarkMode();
  const [activities, setActivities] = useState<ActivitySummaryItem[]>([]);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [editingActivity, setEditingActivity] =
    useState<ActivitySummaryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchActivities() {
      try {
        const res = await api.get<ActivitySummaryItem[]>("/activities");
        if (mounted) {
          setActivities(res.data);
        }
      } catch (e) {
        console.error(e);
        alert("Failed to load activities.");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchActivities();

    return () => {
      mounted = false;
    };
  }, []);

  const REMOVE_ANIMATION_MS = 300;

  async function handleDelete(id: string) {
    setRemovingIds((prev) => new Set(prev).add(id));

    // Layout reflow가 좀 있긴하지만, 굳이 라이브러리 사용안하고 css transition으로 이 정도 구현선에서 마무리함.
    setTimeout(async () => {
      try {
        await api.delete(`/activities/${id}`);

        requestAnimationFrame(() => {
          setActivities((prev) => prev.filter((a) => a.id !== id));
        });
      } catch (e) {
        console.error(e);
        alert("Failed to delete activity.");

        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    }, REMOVE_ANIMATION_MS);
  }

  if (isLoading) {
    return (
      <Card
        className={`rounded-2xl p-8 text-center ${
          isDark
            ? "bg-gray-800 border-gray-700 text-gray-400"
            : "bg-white border-gray-200 text-gray-500"
        }`}
      >
        Loading activities...
      </Card>
    );
  }

  return (
    <>
      <div
        className={`
          space-y-4
          max-h-[80vh]
          overflow-y-auto
          pr-1
        `}
      >
        {activities.length === 0 && (
          <Card
            className={`rounded-2xl p-8 text-center ${
              isDark
                ? "bg-gray-800 border-gray-700 text-gray-400"
                : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            No activities added yet.
          </Card>
        )}

        {activities.map((activity, index) => {
          const isRemoving = removingIds.has(activity.id);
          return (
            <Card
              key={activity.id}
              className={`
                rounded-2xl border
                overflow-hidden
                transition-all duration-300 ease-out
                ${
                  isRemoving ? "opacity-0 max-h-0" : "opacity-100 max-h-[200px]"
                }
                ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}
              `}
            >
              <div className="px-4 py-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`font-semibold truncate ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {activity.name}
                      </div>
                      <div
                        className={`text-sm truncate ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {activity.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ImpactBadge impactScore={activity.impactScore} />

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditingActivity(activity)}
                      className={
                        isDark
                          ? "text-gray-400 hover:text-blue-400 hover:bg-gray-600"
                          : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(activity.id)}
                      disabled={isRemoving}
                      className={
                        isDark
                          ? "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                          : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div
                  className={`text-xs pl-12 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {activity.tier} • {activity.hoursPerWeek} hrs / week
                  {activity.isLeadership && " • Leadership"}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {editingActivity && (
        <ActivityEditModal
          activity={editingActivity}
          onClose={() => setEditingActivity(null)}
          onSaved={(updated) => {
            setActivities((prev) =>
              prev.map((a) => (a.id === updated.id ? updated : a))
            );
          }}
        />
      )}
    </>
  );
}
