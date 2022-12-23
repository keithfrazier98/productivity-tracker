import { Text, View } from "react-native";
import { classes } from "../styles";

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
} from "@expo-google-fonts/lato";
import FullButton from "./FullButton";
import SquareButton from "./SquareButton";
import { GoalTypes } from "../types";

export default function HomePage({ navigation }) {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const NavToGoalPage = ({ goalType }: { goalType: GoalTypes }) => {
    const link = `${goalType} Goals`;
    return (
      <SquareButton
        text={link}
        onPress={() => {
          navigation.navigate(link);
        }}
      />
    );
  };
  return (
    <View style={classes.mainContainer}>
      <View style={classes.topView}>
        <View style={classes.welcomeTextContainer}>
          <Text style={classes.welcomeText}>Welcome back</Text>
        </View>
        <FullButton text={"Check in for the day"} onPress={() => {}} />
        <FullButton
          text={"Check out your progress snapshot"}
          onPress={() => {}}
        />
      </View>

      <View style={classes.bottomContainer}>
        <View style={classes.bottomView}>
        <NavToGoalPage goalType="Daily" />
        <NavToGoalPage goalType="Monthly" />
        </View>
        <View style={classes.bottomView}>
        <NavToGoalPage goalType="Yearly" />
          <SquareButton text="Reflection" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
