import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { styles } from "../../styles";
import { genNewGoal, idgen } from "../../utils";
import {
  goalsToEdit,
  useGetActiveGoalsQuery,
  useGetGoalsQuery,
  useSetGoalsMutation,
} from "./goalsSlice";

export default function EditGoalsPage() {
  const currentGoals = useAppSelector((state) => state.goals.goalsToEdit);
  const dispatch = useAppDispatch();
  const [updateGoal] = useSetGoalsMutation();
  useEffect(() => {
    return () => {
      dispatch(goalsToEdit({ goals: null }));
    };
  }, []);

  const { data: activeGoals } = useGetActiveGoalsQuery(currentGoals);
  const { data: goals } = useGetGoalsQuery(activeGoals);

  function onChange(value: string, key: string, index: number) {
    // goals.splice(index, 1, { ...goals[index], [key]: value });
  }

  return (
    <ScrollView style={styles("padding-12")}>
      <Text style={styles("fontSize-32")}>Edit your {currentGoals} goals</Text>
      <View style={styles("marginVertical-12")}>
        {goals?.map((goal, index) => (
          <View
            style={styles(
              "display-flex flexDirection-row justifyContent-space-between"
            )}
          >
            <TextInput
              value={goal.title}
              style={styles("w-50%")}
              onChangeText={(e) => {
                onChange(e, "title", index);
              }}
            />
            <View
              style={styles(
                "display-flex flexDirection-row justifyContent-space-between"
              )}
            >
              <TextInput
                value={goal.value.toString()}
                onChangeText={(e) => {
                  onChange(e, "value", index);
                }}
              />
              <IconButton icon={"trash-can"} iconColor="#fcbdb6"></IconButton>
            </View>
          </View>
        ))}
      </View>

      <Button
        onPress={() => {
          const id = idgen();
          const newGoal = updateGoal({ [id]: genNewGoal(id, currentGoals) });
        }}
      >
        + Add Goal
      </Button>
    </ScrollView>
  );
}
