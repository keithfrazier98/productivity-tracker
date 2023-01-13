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

const extendedGoalsApi = nativeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Gets an array of active goals given a goal type. */
    getActiveGoals: builder.query({
      query: (goalType: GoalTypes) => {
        return [`${goalType}Goals`, "ActiveGoals"];
      },
      providesTags: ["ACTIVE_GOALS"],
    }),
    getGoals: builder.query({
      query: (goals: string[]) => {
        goals = goalIdsToKeys(goals);
        return [goals, "Goal"];
      },
      providesTags: ["GOALS"],
    }),
    setActiveGoals: builder.mutation({
      query: ({
        activeGoals,
        type,
      }: {
        activeGoals: string[];
        type: GoalTypes;
      }) => {
        return [type, "ActiveGoals", activeGoals];
      },
      invalidatesTags: ["GOALS", "ACTIVE_GOALS"],
    }),
    setGoals: builder.mutation({
      query: (goals: { [goalId: string]: Goal }) => {
        const goalKeys = goalIdsToKeys(Object.keys(goals));
        return [goalKeys, "Goal", Object.values(goals)];
      },
      invalidatesTags: ["GOALS", "ACTIVE_GOALS"],
    }),
  }),
});

export const { goalsToEdit } = goalsSlice.actions;
export const {
  useGetActiveGoalsQuery,
  useSetActiveGoalsMutation,
  useSetGoalsMutation,
  useGetGoalsQuery,
} = extendedGoalsApi;
export default goalsSlice.reducer;
