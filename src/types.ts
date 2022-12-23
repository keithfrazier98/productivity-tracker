export type GoalTypes = "Monthly" | "Daily" | "Yearly";
export interface GoalsState {
  editingGoals: GoalTypes | null;
}
