import { Text, View } from "react-native";
import { styles } from "../Styles";

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
} from "@expo-google-fonts/lato";
import FullButton from "./FullButton";
import SquareButton from "./SquareButton";

export default function HomePage({ navigation }) {
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
        <FullButton text={"Check in for the day"} onPress={() => {}} />
        <FullButton
          text={"Check out your progress snapshot"}
          onPress={() => {}}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomView}>
          <SquareButton
            text="Daily Goals"
            onPress={() => {
              navigation.navigate("Goals");
            }}
          />
          <SquareButton text="Monthly Goals" onPress={() => {}} />
        </View>
        <View style={styles.bottomView}>
          <SquareButton text="Yearly Goals" onPress={() => {}} />
          <SquareButton text="Reflection" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
