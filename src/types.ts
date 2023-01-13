export type NativeQueryTypes =
  | "Goal"
  | "Entry"
  | "EntryMetadata"
  | "Progress"
  | "ActiveGoals";
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
  pointValue: number;
  isActive: boolean;
  created: number;
  inactivated?: number;
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

/**
 * Regex for progress data, matches keys for day, month, or year progress queries.
 */
export const progressPattern =
  /@points_(?:[0-1][1-9]\/)?(:?[0-3][1-9]\/)?[2-9][0-9][2-9][3-9]/;

/**Matches any string that starts with "@goal_" and ends with a 17 character string of
 * letters and numbers.
 */
export const goalPattern = /@goal_[a-z0-9]{17}/;

/** Matches any string that starts with "@entry_" and ends with a number of infinate length.*/
export const entryPattern = /@entry_\d+/;

/** Matches strings that start with "@entryMetadata_" and ends with a number of infinate length. */
export const entryMetaPattern = /@entryMetadata_\d+/;

/** Matches strings that start with a GoalType and ends in "Goals" */
export const activeGoalPattern = /@(Daily|Monthly|Yearly)Goals/;
