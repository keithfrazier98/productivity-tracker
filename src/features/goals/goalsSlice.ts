import { createSlice } from "@reduxjs/toolkit";
import { nativeApiSlice } from "../../redux/apiSlice";
import { Goal, GoalsState, GoalTypes } from "../../types";

const initialState: GoalsState = {
  goalsToEdit: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    goalsToEdit(state, action: { payload: { goals: GoalTypes | null } }) {
      const {
        payload: { goals },
      } = action;

      state.goalsToEdit = goals;
    },
  },
});

const goalIdsToKeys = (goals: string[]) => goals.map((id) => `@goal_${id}`);

const goalEnpoints = nativeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Gets an array of active goals given a goal type. */
    getActiveGoals: builder.query({
      query: (goalType: GoalTypes) => {
        return [`${goalType}Goals`, "ActiveGoals"];
      },
    }),
    getGoals: builder.query({
      query: (goals: string[]) => {
        goals = goalIdsToKeys(goals);
        return [goals, "Goal"];
      },
    }),
    setActiveGoals: builder.query({
      query: (activeGoals: string[]) => {
        return [activeGoals, "ActiveGoals"];
      },
    }),
    setGoals: builder.query({
      query: (goals: { [goalId: string]: Goal }) => {
        const goalKeys = goalIdsToKeys(Object.keys(goals));
        return [goalKeys, "Goal", Object.values(goals)];
      },
    }),
  }),
});

export const { goalsToEdit } = goalsSlice.actions;
export const { getActiveGoals, setActiveGoals, setGoals, getGoals } =
  goalEnpoints.endpoints;
export default goalsSlice.reducer;
