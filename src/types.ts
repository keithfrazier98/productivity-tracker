export type GoalTypes = "Monthly" | "Daily" | "Yearly";
export interface GoalsState {
  /**The goals currently selected to be edited. */
  goalsToEdit: GoalTypes | null;
}

/**A goal as it is stored natively. Accessed from native storage as
 * follows: @goal_id
 */
export interface Goal {
  type: GoalTypes;
  id: string;
  title: string;
  PointValue: number;
  isActive: boolean;
  created: number;
  inactivated: number;
}

/**A collection of goals to represent which were completed on a specific day.
 * Accessed from native AsyncStorage as follows:
 *
 * Day Keys: @points_[mm/dd/yyyy]
 *
 * Month Keys: @points_[mm/yyyy]
 *
 * Year Keys: @points_[yyyy]
 */
export interface GoalProgress {
  [goalId: string]: boolean;
}

/**
 * Describes entry metadata as a single unit. The actual entry metadata
 * is stored in arrays of 50, and accessed by the key convention 
 * of @EntryMetadata_[0 - infinity]. 
 */
export interface EntryMetadata {
  accessId: string;
  created: string;
  snipped: string;
}
