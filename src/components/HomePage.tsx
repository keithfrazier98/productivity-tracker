import { Text, View} from "react-native";
import { styles } from "../Styles";

import {
    useFonts,
    Lato_300Light,
    Lato_400Regular,
  } from "@expo-google-fonts/lato";
import FullButton from "./FullButton";
import SquareButton from "./SquareButton";

export default function HomePage() {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topView}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome back</Text>
        </View>
        <FullButton text={"Check in for the day"} link="" />
        <FullButton text={"Check out your progress snapshot"} link="" />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomView}>
          <SquareButton text="Daily Goals" link="" />
          <SquareButton text="Monthly Goals" link="" />
        </View>
        <View style={styles.bottomView}>
          <SquareButton text="Yearly Goals" link="" />
          <SquareButton text="Reflection" link="" />
        </View>
      </View>
    </View>
  );
}
