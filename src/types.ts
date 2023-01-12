export type GoalTypes = "Monthly" | "Daily" | "Yearly";
export interface GoalsState {
  goalsToEdit: GoalTypes | null;
}
