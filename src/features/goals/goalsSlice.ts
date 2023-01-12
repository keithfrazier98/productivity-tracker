import { createSlice } from "@reduxjs/toolkit";
import { GoalsState, GoalTypes } from "../../types";

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

export const { goalsToEdit } = goalsSlice.actions;
export default goalsSlice.reducer