import React, { useState } from "react";
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
import { Trash2, Edit, Award } from "lucide-react";

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
  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
    ></div>
  );
}
