import { registerRootComponent } from "expo";
import { Pressable, StyleSheet, Text, View as RNView } from "react-native";
import { styled } from "nativewind";
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
} from "@expo-google-fonts/lato";
import { SimpleLineIcons } from "@expo/vector-icons";
const View = styled(RNView);

export default function App() {
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
        <FullBtn text={"Check in for the day"} link="" />
        <FullBtn text={"Check out your progress snapshot"} link="" />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomView}>
          <SquareBtn text="Daily Goals" link="" />
          <SquareBtn text="Monthly Goals" link="" />
        </View>
        <View style={styles.bottomView}>
          <SquareBtn text="Yearly Goals" link="" />
          <SquareBtn text="Reflection" link="" />
        </View>
      </View>
    </View>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  bottomContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  squareBtn: {
    width: 150,
    height: 100,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    fontFamily: "Lato_300Light",
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    shadowColor: "black",
  },
  bottomView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topView: {
    height: "60%",
    backgroundColor: "#F2F2F2",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    width: "100%",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  longBtn: {
    backgroundColor: "#fff",
    padding: 20,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeTextContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 5,
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: "Lato_300Light",
  },
});

function FullBtn({ text, link }) {
  return (
    <Pressable style={styles.longBtn}>
      <Text>{text}</Text>
      <SimpleLineIcons name="arrow-right" size={12} color="black" />
    </Pressable>
  );
}

function SquareBtn({ text, link }) {
  function onPress() {
    alert("You pressed a button");
  }
  return (
    <Pressable onPress={onPress} style={styles.squareBtn}>
      <Text style={{ fontFamily: "Lato_400Light" }}>{text}</Text>
    </Pressable>
  );
}
