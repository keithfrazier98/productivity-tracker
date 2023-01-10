import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { styles } from "../../styles";
export default function ProgressPage() {
  const [goals, setGoals] = useState([
    { key: "Get up before 7:30", checked: false, value: 10 },
    { key: "Eat 3 Healthy meals", checked: true, value: 10 },
    { key: "Read the news", checked: false, value: 10 },
    { key: "4 personal goals", checked: false, value: 10 },
    { key: "Stick to schedule", checked: false, value: 10 },
    { key: "25 pushups + situps", checked: false, value: 10 },
  ]);

  const getTotal = useMemo(() => {
    let total = 0;
    Object.values(goals).forEach(({ checked, value }) => {
      if (checked) total += value;
    });
    return total;
  }, [goals]);

  return (
    <View style={styles("display-flex flexDirection-col", "padding-32 ")}>
      <Text style={styles("fontSize-32 marginBottom-48")}>
        Log today's points
      </Text>
      <View style={styles("width-100%")}>
        {goals.map(({ checked, key, ...rest }, index) => (
          <View
            style={styles("display-flex flexDirection-row alignItems-center")}
          >
            <Text style={styles("fontSize-24")}>{key}</Text>
            <RadioButton
              value={key}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                const newGoals = goals.slice();
                newGoals.splice(index, 1, { key, checked: !checked, ...rest });
                setGoals(newGoals);
              }}
            />
          </View>
        ))}
      </View>
      <View style={styles("marginVertical-32")}>
        <Text style={styles("fontSize-32")}>Today's Total: {getTotal}</Text>
      </View>
    </View>
  );
}
