import { Button, View } from "react-native";
import { Text } from "react-native-paper";
import FullButton from "../../components/FullButton";
import { styles } from "../../styles";
export default function ReflectionPage({ navigation }) {
  const ipsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <View style={styles("padding-12 h-100%")}>
      <Text variant="titleSmall" style={styles("marginBottom-12")}>
        Reflection entries help you better understand yourself overtime. Reflect
        upon your past entries, or create a new one!
      </Text>
      <FullButton
        text={"Create new entry"}
        onPress={() => {
          navigation.navigate("New Entry");
        }}
      />

      <Text variant="titleSmall" style={styles("marginVertical-12 color-gray")}>
        Reflection entries cannot be edited past the day they are written, you
        can't change the past!
      </Text>
      <View
        style={styles(
          "display-flex flexGrow-1 flexDirection-col justifyContent-space-around"
        )}
      >
        <View>
          <Text variant="headlineMedium" style={styles("marginBottom-12")}>
            Your last entry:
          </Text>
          <Text variant="bodyLarge" numberOfLines={4}>
            {ipsum}
          </Text>
          <FullButton onPress={() => {}} text={"Read More"} />
        </View>

        <View>
          <Text variant="headlineMedium" style={styles("marginBottom-12")}>
            This time last year...
          </Text>
          <Text variant="bodyMedium" numberOfLines={4}>
            {ipsum}
          </Text>
          <FullButton onPress={() => {}} text={"Read More"} />
        </View>
      </View>
    </View>
  );
}
