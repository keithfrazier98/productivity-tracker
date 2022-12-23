import { Pressable, StyleSheet, Text, View as RNView } from "react-native";
import { classes } from "../styles";

export default function SquareButton({ text, onPress }) {
  return (
    <Pressable onPress={onPress} style={classes.squareBtn}>
      <Text style={{ fontFamily: "Lato_400Light" }}>{text}</Text>
    </Pressable>
  );
}
