import { SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { classes } from "../styles";
export default function FullButton({ text, onPress }) {
  return (
    <Pressable style={classes.longBtn} onPress={onPress}>
      <Text>{text}</Text>
      <SimpleLineIcons name="arrow-right" size={12} color="black" />
    </Pressable>
  );
}
