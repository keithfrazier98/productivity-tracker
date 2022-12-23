import { SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { styles } from "../Styles";
export default function FullButton({ text, onPress }) {
  return (
    <Pressable style={styles.longBtn} onPress={onPress}>
      <Text>{text}</Text>
      <SimpleLineIcons name="arrow-right" size={12} color="black" />
    </Pressable>
  );
}
