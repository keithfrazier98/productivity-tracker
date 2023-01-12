export type GoalTypes = "Monthly" | "Daily" | "Yearly";
export interface GoalsState {
  goalsToEdit: GoalTypes | null;
}
export interface Goal {
  type: GoalTypes;
  id: string;
  title: string;
  PointValue: number;
  isActive: boolean;
  created: number;
  inactivated: number;
}

export interface GoalProgress {
  [goalId: string]: boolean;
}

export interface EntryMetadata {
  id: string;
  created: string;
  snipped: string;
}
