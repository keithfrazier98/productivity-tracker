import { createSlice } from "@reduxjs/toolkit";
import { GoalsState, GoalTypes } from "../../types";

const initialState: GoalsState = {
  editingGoals: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    editingGoals(state, action: { payload: { goals: GoalTypes | null } }) {
      const {
        payload: { goals },
      } = action;

      state.editingGoals = goals;
    },
  },
});

export const { editingGoals } = goalsSlice.actions;
export default goalsSlice.reducer