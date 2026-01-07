import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "activity.db");

export const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    tier TEXT NOT NULL,
    description TEXT NOT NULL,
    hoursPerWeek INTEGER NOT NULL,
    isLeadership INTEGER NOT NULL,
    createdAt TEXT NOT NULL
  );
`);

export type ActivityRow = {
  id: string;
  name: string;
  category: ActivityCategoryRow;
  tier: ActivityTierRow;
  description: string;
  hoursPerWeek: number;
  isLeadership: 0 | 1;
  createdAt: string;
};

export type ActivityCategoryRow =
  | "Sports"
  | "Arts"
  | "Academic"
  | "Community Service"
  | "Leadership"
  | "Other";

export type ActivityTierRow =
  | "School"
  | "Regional"
  | "State"
  | "National"
  | "International";
