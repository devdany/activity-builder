import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { api } from "@/lib/api";
import type { ActivitySummaryItem } from "./ActivitySummaryStep";

const MAX_DESC_LENGTH = 150;

const CATEGORIES = [
  "Sports",
  "Arts",
  "Academic",
  "Community Service",
  "Leadership",
  "Other",
];

const TIERS = ["School", "Regional", "State", "National", "International"];

interface Props {
  isDark: boolean;
  activity: ActivitySummaryItem;
  onClose: () => void;
  onSaved: (updated: ActivitySummaryItem) => void;
}

export function ActivityEditModal({
  isDark,
  activity,
  onClose,
  onSaved,
}: Props) {
  const [draft, setDraft] = useState<ActivitySummaryItem>(activity);
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState(
    String(activity.hoursPerWeek)
  );
  const [isSaving, setIsSaving] = useState(false);

  const isDescTooLong = draft.description.length > MAX_DESC_LENGTH;

  async function handleSave() {
    if (!draft.name.trim()) {
      alert("Activity name is required.");
      return;
    }

    if (draft.name.trim().length > 50) {
      alert("Activity name must be 50 characters or less.");
      return;
    }

    if (!draft.category) {
      alert("Please select a category.");
      return;
    }

    if (!draft.tier) {
      alert("Please select a tier.");
      return;
    }

    if (!draft.description.trim()) {
      alert("Description is required.");
      return;
    }

    if (draft.description.length > MAX_DESC_LENGTH) {
      alert("Description must be 150 characters or less.");
      return;
    }

    if (draft.hoursPerWeek < 0 || draft.hoursPerWeek > 40) {
      alert("Hours per week must be between 0 and 40.");
      return;
    }

    try {
      setIsSaving(true);

      const res = await api.put<ActivitySummaryItem>(
        `/activities/${activity.id}`,
        {
          category: draft.category,
          description: draft.description,
          hoursPerWeek: draft.hoursPerWeek,
          id: draft.id,
          isLeadership: draft.isLeadership,
          name: draft.name,
          tier: draft.tier,
        }
      );
      onSaved(res.data);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to update activity.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className={`max-w-2xl ${
          isDark ? "bg-gray-800 text-white border-gray-700" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Activity Name</label>
            <Input
              value={draft.name}
              onChange={(e) =>
                setDraft((d) => ({ ...d, name: e.target.value }))
              }
              className={isDark ? "bg-gray-700 border-gray-600" : ""}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              value={draft.category}
              onValueChange={(v) => setDraft((d) => ({ ...d, category: v }))}
            >
              <SelectTrigger
                className={isDark ? "bg-gray-700 border-gray-600" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Tier</label>
            <Select
              value={draft.tier}
              onValueChange={(v) => setDraft((d) => ({ ...d, tier: v }))}
            >
              <SelectTrigger
                className={isDark ? "bg-gray-700 border-gray-600" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIERS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Description (max 150 chars)
            </label>
            <Textarea
              rows={4}
              value={draft.description}
              onChange={(e) =>
                setDraft((d) => ({ ...d, description: e.target.value }))
              }
              className={isDark ? "bg-gray-700 border-gray-600" : ""}
            />
            <div className="flex justify-between text-xs mt-1">
              {isDescTooLong && (
                <span className="text-red-500">Exceeds 150 characters</span>
              )}
              <span
                className={isDescTooLong ? "text-red-500" : "text-gray-400"}
              >
                {draft.description.length} / 150
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Hours per week</label>
            <Input
              value={hoursPerWeekInput}
              onChange={(e) => {
                const raw = e.target.value;

                if (raw === "") {
                  setHoursPerWeekInput("");
                  return;
                }

                // 숫자만 허용
                if (!/^\d+$/.test(raw)) return;

                const num = Number(raw);

                if (num < 0 || num > 40) return;

                setHoursPerWeekInput(raw);

                setDraft((d) => ({
                  ...d,
                  hoursPerWeek: num,
                }));
              }}
              placeholder="0 - 40"
              className={
                isDark ? "bg-gray-700 border-gray-600 text-gray-200" : ""
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={draft.isLeadership}
              onCheckedChange={(v) =>
                setDraft((d) => ({ ...d, isLeadership: Boolean(v) }))
              }
            />
            <span className="text-sm">Leadership position</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
