import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../../styles";
import GoalChart from "./GoalChart";

export default function ProgressSnapshotPage() {
  return (
    <ScrollView style={styles("padding-12")}>
      <Text style={styles("marginVertical-12")} variant="headlineLarge">
        Your Producivity Snapshot
      </Text>
      <Text variant="labelLarge">
        You are doing great, but here is some data on your producivity to help
        you even more.
      </Text>
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
    </ScrollView>
  );
}
