import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../../styles";
import GoalChart from "./GoalChart";

const InsightText = ({ children }: { children: string }) => {
  return (
    <Text variant="bodyLarge" style={styles("marginVertical-6")}>
      {children}
    </Text>
  );
};

export default function ProgressSnapshotPage() {
  return (
    <ScrollView style={styles("padding-12 display-flex")}>
      <Text style={styles("marginVertical-12")} variant="headlineLarge">
        Your Producivity Snapshot
      </Text>
      <Text variant="labelLarge">
        You are doing great, but here is some data on your producivity to help
        you even more.
      </Text>
      <InsightText>
        You’ve written X entries this month, and your average day score so far
        this month is X, compared to last month average of X.
      </InsightText>
      <InsightText>
        Your tone in your entries is over all X (positive, negative, passive,
        optimistic), and you’ve written most about X (goals, money, stress).
      </InsightText>
      <Text variant="bodyLarge">
        You’re completing more of you defensive goals, rather than your
        offensive goals.
      </Text>
      <View style={styles("marginVertical-12")}>
        <Text variant="headlineSmall">Daily Goals</Text>
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
      <View style={styles("marginBottom-12")}>
        <Text variant="headlineSmall">Daily Goals By Month</Text>
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
      <View>
        <Text variant="headlineSmall">Monthly Goals</Text>
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
    </ScrollView>
  );
}
