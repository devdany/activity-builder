import { Router } from "express";
import { ActivityRow, db } from "../../db";
import crypto from "crypto";
import { validateCreateActivity, validateUpdateActivity } from "./middleware";
import { Activity, ActivityTier, TIER_SCORE_MAP } from "./dto";

const router = Router();

function calculateImpactScore(params: {
  tier: ActivityTier;
  hoursPerWeek: number;
  isLeadership: boolean;
}): number {
  const { tier, hoursPerWeek, isLeadership } = params;

  let score = TIER_SCORE_MAP[tier];

  if (isLeadership) {
    score += 2;
  }

  if (hoursPerWeek > 10) {
    score += 1;
  }

  return score;
}

function mapRowToActivity(row: ActivityRow): Activity {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    tier: row.tier,
    description: row.description,
    hoursPerWeek: row.hoursPerWeek,
    isLeadership: Boolean(row.isLeadership),
    impactScore: calculateImpactScore({
      tier: row.tier,
      hoursPerWeek: row.hoursPerWeek,
      isLeadership: Boolean(row.isLeadership),
    }),
  };
}

router.get("/", (_req, res) => {
  const rows = db
    .prepare<[], ActivityRow>(
      `
      SELECT
        id,
        name,
        category,
        tier,
        description,
        hoursPerWeek,
        isLeadership,
        createdAt
      FROM activities
      ORDER BY createdAt DESC
      `
    )
    .all();

  const activities: Activity[] = rows.map(mapRowToActivity);

  res.json(activities);
});

router.post("/", validateCreateActivity, (req, res) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const { name, category, tier, description, hoursPerWeek, isLeadership } =
    req.body;

  db.prepare(
    `
      INSERT INTO activities (
        id,
        name,
        category,
        tier,
        description,
        hoursPerWeek,
        isLeadership,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
  ).run(
    id,
    name,
    category,
    tier,
    description,
    hoursPerWeek,
    isLeadership ? 1 : 0,
    now
  );

  return res.status(201).json({ id });
});

router.put("/:id", validateUpdateActivity, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const columns = Object.keys(updates)
    .map((k) => `${k} = ?`)
    .join(", ");

  const values = Object.values(updates).map((v) => {
    if (typeof v === "boolean") return v ? 1 : 0;
    return v;
  });

  const result = db
    .prepare(
      `
      UPDATE activities
      SET ${columns}
      WHERE id = ?
      `
    )
    .run(...values, id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "NotFound",
      message: "activity not found",
    });
  }

  const row = db
    .prepare<[string], ActivityRow>(
      `
      SELECT
        id,
        name,
        category,
        tier,
        description,
        hoursPerWeek,
        isLeadership,
        createdAt
      FROM activities
      WHERE id = ?
      `
    )
    .get(id);

  if (!row) {
    return res.status(500).json({
      error: "UnexpectedError",
      message: "updated activity not found",
    });
  }

  const activity = mapRowToActivity(row);

  return res.json(activity);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const result = db.prepare("DELETE FROM activities WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "NotFound",
      message: "activity not found",
    });
  }

  res.json({ success: true });
});

export default router;
