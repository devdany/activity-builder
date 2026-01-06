import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Trash2,
  Edit,
  Award,
  Lightbulb,
  Disc2,
  Users,
  PenTool,
  CircleCheck,
  TrendingUp,
} from "lucide-react";
import { ActivitySidebar } from "./SideBar";
import type { ActivityBuilderStepKey } from "@/ActivityBuilder.types";
import { ActivityStepActions } from "./NavigationButtons";

interface Activity {
  id: string;
  name: string;
  category: string;
  tier: string;
  description: string;
  hoursPerWeek: number;
  isLeadership: boolean;
  impactScore: number;
}

interface ActivityBuilderProps {
  isDark: boolean;
  onActivitiesChange?: (activities: Activity[]) => void;
}

export function ActivityBuilder({
  isDark,
  onActivitiesChange,
}: ActivityBuilderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState<ActivityBuilderStepKey>("2-1");
  const [tier, setTier] = useState<string>("");
  const MIN_DESC_LENGTH = 150;
  const [description, setDescription] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("");
  const [isLeadership, setIsLeadership] = useState(false);

  const impactScore = useMemo(() => {
    let score = 0;

    switch (tier) {
      case "school":
        score += 1;
        break;
      case "regional":
        score += 2;
        break;
      case "state":
        score += 3;
        break;
      case "national":
        score += 4;
        break;
      case "international":
        score += 5;
        break;
    }

    if (isLeadership) score += 2;
    const hours = Number(hoursPerWeek || 0);
    if (hours > 10) score += 1;

    return score;
  }, [tier, isLeadership, hoursPerWeek]);

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

  const activities: Activity[] = [
    {
      id: "1",
      name: "Varsity Soccer",
      category: "Sports",
      tier: "National",
      description: "",
      hoursPerWeek: 12,
      isLeadership: true,
      impactScore: 7,
    },
    {
      id: "2",
      name: "Student Council",
      category: "Leadership",
      tier: "School",
      description: "",
      hoursPerWeek: 4,
      isLeadership: false,
      impactScore: 2,
    },
  ];

  const stepContent = useMemo(() => {
    switch (step) {
      case "2-1":
        return (
          <>
            <Card
              className={`rounded-2xl border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Disc2 className="w-6 h-6 text-blue-400" aria-hidden />
                  <CardTitle
                    className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Activity Title
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="activity-title"
                    className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    What is the name of your activity?
                  </label>

                  <Input
                    id="activity-title"
                    placeholder="e.g., National Honor Society, Varsity Soccer, Student Council"
                    className={`max-w-2xl mt-2 ${isDark ? "bg-gray-700 border-gray-600 text-gray-200" : ""}`}
                  />
                </div>

                <div
                  className={`rounded-lg border p-4 ${isDark ? "bg-yellow-900/20 border-yellow-800" : "bg-yellow-50 border-yellow-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb
                      className="w-5 h-5 flex-shrink-0 text-yellow-500 mt-0.5"
                      aria-hidden
                    />
                    <div className="space-y-1">
                      <p
                        className={`text-sm font-semibold ${isDark ? "text-yellow-200" : "text-yellow-800"}`}
                      >
                        Tip:
                      </p>
                      <p
                        className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
                      >
                        Use the official name of the activity. If it's a common
                        activity, be specific about your school or organization
                        (e.g., “Jefferson High School Debate Team” rather
                        thanjust “Debate Team”).
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg border ${isDark ? "border-gray-600" : "border-gray-200"}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full px-4 py-4 h-auto text-left flex items-center gap-3 hover:bg-transparent active:bg-transparent focus:bg-transparent"
                    // 아코디언 구현 생략
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${isDark ? "bg-blue-500/20" : "bg-blue-100"}`}
                    >
                      <Disc2 className="w-4 h-4 text-blue-400" aria-hidden />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium whitespace-normal break-words ${isDark ? "text-gray-200" : "text-gray-900"}`}
                      >
                        Need examples? View activity title ideas
                      </div>
                      <div
                        className={`text-sm whitespace-normal break-words mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        See examples of strong activity titles
                      </div>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-purple-600 dark:text-purple-400 transform transition-transform title-examples-chevron"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <ActivityStepActions isDark />
          </>
        );

      case "2-2":
        return (
          <>
            <Card
              className={`rounded-2xl border ${
                isDark
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-400" aria-hidden />
                  <CardTitle
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Activity Type
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
                    Select the category that best describes your activity
                  </label>

                  <Select>
                    <SelectTrigger
                      className={`
                        w-full h-12 mt-2
                        ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-300"
                            : "bg-gray-50 border-gray-300 text-gray-900"
                        }
                      `}
                    >
                      <SelectValue placeholder="Choose an activity type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="community">
                        Community Service
                      </SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-yellow-900/20 border-yellow-800"
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb
                      className="w-5 h-5 flex-shrink-0 text-yellow-500 mt-0.5"
                      aria-hidden
                    />

                    <div className="space-y-1">
                      <p
                        className={`text-sm font-semibold ${
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
                        Choose the category that colleges will use to understand
                        your activity. If you're unsure, pick the most relevant
                        category and Unni will recommend the best fit.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ActivityStepActions isDark />
          </>
        );

      case "2-3":
        return (
          <>
            <Card
              className={`rounded-2xl border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-purple-400" aria-hidden />
                  <CardTitle
                    className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Activity Tier
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    What level was this activity?
                  </label>

                  <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger
                      className={`w-full h-12 mt-2 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-300"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                    >
                      <SelectValue placeholder="Select activity tier" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="national">National</SelectItem>
                      <SelectItem value="international">
                        International
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div
                  className={`rounded-lg border p-4 ${isDark ? "bg-yellow-900/20 border-yellow-800" : "bg-yellow-50 border-yellow-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <p
                      className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
                    >
                      Higher tiers generally indicate broader impact and
                      recognition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ActivityStepActions isDark continueDisabled={!tier} />
          </>
        );

      case "2-4":
        return (
          <>
            <Card
              className={`rounded-2xl border ${
                isDark
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <PenTool className="w-6 h-6 text-orange-400" aria-hidden />
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
                    className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Description (required, minimum 150 characters)
                  </label>

                  <Textarea
                    rows={5}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="What specific tasks did you perform? Include concrete actions, numbers, and outcomes."
                    className={`
                      mt-2 resize-none
                      ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }
                    `}
                  />

                  <div className="flex justify-between items-center text-xs mt-1">
                    <span
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {Math.max(MIN_DESC_LENGTH - description.length, 0)} more
                      chars for minimum
                    </span>

                    <span
                      className={`font-medium ${
                        description.length < MIN_DESC_LENGTH
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
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
                  className={`
                    rounded-lg p-4 border mb-4
                    ${
                      isDark
                        ? "bg-yellow-900/20 border-yellow-800"
                        : "bg-yellow-50 border-yellow-200"
                    }
                  `}
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb
                      className="w-5 h-5 flex-shrink-0 text-yellow-500 mt-0.5"
                      aria-hidden
                    />

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
                        Focus on action verbs and specific tasks. Don&apos;t
                        just say what the organization does — explain what YOU
                        did. Include numbers, outcomes, and concrete examples.
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
                    className="w-full px-4 py-4 h-auto text-left flex items-center gap-3 hover:bg-transparent active:bg-transparent focus:bg-transparent"
                    // 아코디언 구현 생략
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${
                        isDark ? "bg-orange-500/20" : "bg-orange-100"
                      }`}
                    >
                      <PenTool
                        className="w-4 h-4 text-orange-400"
                        aria-hidden
                      />
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
                        className={`text-sm whitespace-normal break-words mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Powerful verbs to make your description stand out
                      </div>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-purple-600 dark:text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <ActivityStepActions
              isDark={isDark}
              continueDisabled={description.length < MIN_DESC_LENGTH}
            />
          </>
        );

      case "2-5":
        return (
          <>
            <Card
              className={`rounded-2xl border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-400" aria-hidden />
                  <CardTitle
                    className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Time Commitment & Leadership
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Hours per week (0–40)
                  </label>

                  <Input
                    value={hoursPerWeek}
                    onChange={(e) => {
                      const raw = e.target.value;

                      // 공백 허용 (입력 중)
                      if (raw === "") {
                        setHoursPerWeek("");
                        return;
                      }

                      // 숫자만 허용
                      if (!/^\d+$/.test(raw)) return;

                      const v = Number(raw);

                      // 범위 제한
                      if (v < 0 || v > 40) return;

                      setHoursPerWeek(raw); // string 그대로 유지
                    }}
                    placeholder="e.g., 5"
                    className={
                      isDark ? "bg-gray-700 border-gray-600 text-gray-200" : ""
                    }
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isLeadership}
                    onCheckedChange={(v) => setIsLeadership(Boolean(v))}
                  />
                  <div>
                    <p
                      className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                    >
                      Leadership position
                    </p>
                    <p
                      className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Check if you held a leadership role in this activity
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-lg border p-4 ${isDark ? "bg-yellow-900/20 border-yellow-800" : "bg-yellow-50 border-yellow-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <p
                      className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
                    >
                      Leadership roles and higher time commitment increase your
                      overall impact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ActivityStepActions
              isDark={isDark}
              continueDisabled={!hoursPerWeek}
              continueButtonText="Submit"
            />
          </>
        );

      case "3-1":
        return (
          <div className="space-y-4">
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

            {activities.map((activity, index) => (
              <Card
                key={activity.id}
                className={`rounded-2xl border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
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
                      <Badge
                        className={`
                          ${
                            activity.impactScore >= 7
                              ? "bg-purple-100 text-purple-700"
                              : activity.impactScore >= 5
                                ? "bg-green-100 text-green-700"
                                : activity.impactScore >= 3
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        Impact {activity.impactScore}
                      </Badge>

                      <Button
                        size="icon"
                        variant="ghost"
                        className={`
                          transition-colors
                          ${
                            isDark
                              ? "text-gray-400 hover:text-blue-400 hover:bg-gray-600"
                              : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                          }
                        `}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`
                          transition-colors
                          ${
                            isDark
                              ? "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                              : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                          }
                        `}
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
            ))}
          </div>
        );
    }
  }, [step, isDark, tier, description, hoursPerWeek, isLeadership]);

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
