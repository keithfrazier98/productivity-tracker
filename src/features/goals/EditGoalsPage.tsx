import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { styles } from "../../styles";
import { editingGoals } from "./goalsSlice";

export default function EditGoalsPage() {
  const currentGoals = useAppSelector((state) => state.goals.editingGoals);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(editingGoals({ goals: null }));
    };
  }, []);

  return (
    <View style={styles("padding-20")}>
      <Text style={styles("fontSize-32")}>Edit your {currentGoals} goals</Text>
    </View>
  );
}
