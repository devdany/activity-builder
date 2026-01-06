export type ActivityBuilderStepKey =
  | "2-1"
  | "2-2"
  | "2-3"
  | "2-4"
  | "2-5"
  | "3-1";

export type ActivityBuilderStep = {
  step: ActivityBuilderStepKey;
  title: string;
  description: string;
  enabled: boolean;
};
