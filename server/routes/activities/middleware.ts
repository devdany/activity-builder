import { Request, Response, NextFunction } from "express";
import {
  CATEGORY_VALUES,
  TIER_SCORE_MAP,
  ActivityTier,
  ValidatedActivity,
} from "./dto";

type RequiredOption = { required: boolean };

function validateName(
  value: unknown,
  { required }: RequiredOption
): string | undefined {
  if (value === undefined) {
    if (required) throw new Error("name is required");
    return;
  }

  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    value.length > 50
  ) {
    throw new Error("name must be a non-empty string (max 50 chars)");
  }

  return value.trim();
}

function validateCategory(
  value: unknown,
  { required }: RequiredOption
): string | undefined {
  if (value === undefined) {
    if (required) throw new Error("category is required");
    return;
  }

  if (typeof value !== "string" || !CATEGORY_VALUES.includes(value)) {
    throw new Error("invalid category value");
  }

  return value;
}

function validateTier(
  value: unknown,
  { required }: RequiredOption
): ActivityTier | undefined {
  if (value === undefined) {
    if (required) throw new Error("tier is required");
    return;
  }

  if (typeof value !== "string" || !(value in TIER_SCORE_MAP)) {
    throw new Error("invalid tier value");
  }

  return value as ActivityTier;
}

function validateDescription(
  value: unknown,
  { required }: RequiredOption
): string | undefined {
  if (value === undefined) {
    if (required) throw new Error("description is required");
    return;
  }

  if (typeof value !== "string" || value.trim().length < 150) {
    throw new Error("description must be at least 150 characters");
  }

  return value.trim();
}

function validateHoursPerWeek(
  value: unknown,
  { required }: RequiredOption
): number | undefined {
  if (value === undefined) {
    if (required) throw new Error("hoursPerWeek is required");
    return;
  }

  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0 ||
    value > 40
  ) {
    throw new Error("hoursPerWeek must be an integer between 0 and 40");
  }

  return value;
}

function validateIsLeadership(value: unknown): boolean | undefined {
  if (value === undefined) return;
  return Boolean(value);
}

function validationError(res: Response, message: string) {
  return res.status(400).json({
    error: "ValidationError",
    message,
  });
}

export function validateCreateActivity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const validated: Required<ValidatedActivity> = {
      name: validateName(body.name, { required: true })!,
      category: validateCategory(body.category, { required: true })!,
      tier: validateTier(body.tier, { required: true })!,
      description: validateDescription(body.description, { required: true })!,
      hoursPerWeek: validateHoursPerWeek(body.hoursPerWeek, {
        required: true,
      })!,
      isLeadership: validateIsLeadership(body.isLeadership) ?? false,
    };

    req.body = validated;
    next();
  } catch (err) {
    return validationError(res, (err as Error).message);
  }
}

export function validateUpdateActivity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const validated: ValidatedActivity = {};

    const name = validateName(body.name, { required: false });
    if (name !== undefined) validated.name = name;

    const category = validateCategory(body.category, { required: false });
    if (category !== undefined) validated.category = category;

    const tier = validateTier(body.tier, { required: false });
    if (tier !== undefined) validated.tier = tier;

    const description = validateDescription(body.description, {
      required: false,
    });
    if (description !== undefined) validated.description = description;

    const hours = validateHoursPerWeek(body.hoursPerWeek, { required: false });
    if (hours !== undefined) validated.hoursPerWeek = hours;

    const leadership = validateIsLeadership(body.isLeadership);
    if (leadership !== undefined) validated.isLeadership = leadership;

    if (Object.keys(validated).length === 0) {
      throw new Error("no valid fields to update");
    }

    req.body = validated;
    next();
  } catch (err) {
    return validationError(res, (err as Error).message);
  }
}
