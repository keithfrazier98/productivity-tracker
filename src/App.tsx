import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./components/HomePage";
import GoalsPage from "./features/goals/GoalsPage";
import { GoalTypes } from "./types";

const Stack = createNativeStackNavigator();

export default function App() {
  const goalTypes: GoalTypes[] = ["Daily", "Monthly", "Yearly"];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        {goalTypes.map((goalType) => (
          <Stack.Screen
            name={`${goalType} Goals`}
            component={(props) => <GoalsPage {...props} goalType={goalType} />}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
