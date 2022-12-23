import { Dimensions, FlatList, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import FullButton from "../../components/FullButton";
import { composeStyleSheet, classes, styles } from "../../styles";
import { GoalTypes } from "../../types";

export default function GoalsPage({ goalType }: { goalType: GoalTypes }) {
  return (
    <View style={styles("flexGrow-1")}>
      <View
        style={styles(
          "flex flexDirection-row backgroundColor-black",
          "paddingVertical-20"
        )}
      >
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View
        style={styles("flexGrow-1 padding-20 display-flex flexDirection-col")}
      >
        <Text style={styles("fontSize-32")}>
          Your {goalType} Goals
        </Text>
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
        <FullButton text={"Edit Daily Goals"} onPress={() => {}} />
        <FullButton text={"Log today's progress"} onPress={() => {}} />
      </View>
    </View>
  );
}
