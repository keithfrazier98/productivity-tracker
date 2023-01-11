import { FlatList, Text, View } from "react-native";
import FullButton from "../../components/FullButton";
import { useAppDispatch } from "../../redux/hooks";
import { styles } from "../../styles";
import { GoalTypes } from "../../types";
import GoalChart from "./GoalChart";
import { editingGoals } from "./goalsSlice";

export default function GoalsPage({
  goalType,
  navigation,
}: {
  goalType: GoalTypes;
  navigation: any;
}) {
  const dispatch = useAppDispatch();

  return (
    <View style={styles("flexGrow-1")}>
      <View
        style={styles(
          "flex flexDirection-row backgroundColor-black",
          "paddingVertical-20"
        )}
      >
        <GoalChart
          data={[
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ]}
          labels={["January", "February", "March", "April", "May", "June"]}
        />
      </View>
      <View
        style={styles("flexGrow-1 padding-20 display-flex flexDirection-col")}
      >
        <Text style={styles("fontSize-32")}>Your {goalType} Goals</Text>
        <FlatList
          data={[
            { key: "Get up before 7:30" },
            { key: "Eat 3 Healthy meals" },
            { key: "Read the news" },
            { key: "4 personal goals" },
            { key: "Stick to schedule" },
            { key: "25 pushups + situps" },
          ]}
          renderItem={({ item }) => (
            <Text style={styles("fontSize-18 marginVertical-4")}>
              {item.key}
            </Text>
          )}
        />
        <FullButton
          text={"Edit Daily Goals"}
          onPress={() => {
            dispatch(editingGoals({ goals: goalType }));
            navigation.navigate("Edit Goals");
          }}
        />
        <FullButton
          text={"Log today's progress"}
          onPress={() => {
            navigation.navigate("Progress");
          }}
        />
      </View>
    </View>
  );
}
