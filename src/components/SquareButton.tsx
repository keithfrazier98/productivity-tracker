import { Pressable, StyleSheet, Text, View as RNView } from "react-native";
import { styles } from "../Styles";

export default function SquareButton({ text, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.squareBtn}>
      <Text style={{ fontFamily: "Lato_400Light" }}>{text}</Text>
    </Pressable>
  );
}
