import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./components/HomePage";
import GoalsPage from "./features/goals/GoalsPage";
import { GoalTypes } from "./types";
import EditGoalsPage from "./features/goals/EditGoalsPage";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
const Stack = createNativeStackNavigator();

export default function App() {
  const goalTypes: GoalTypes[] = ["Daily", "Monthly", "Yearly"];

  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          {goalTypes.map((goalType) => (
            <Stack.Screen name={`${goalType} Goals`}>
              {(props) => <GoalsPage {...props} goalType={goalType} />}
            </Stack.Screen>
          ))}

          <Stack.Screen name="Edit Goals" component={EditGoalsPage} />
        </Stack.Navigator>
      </ReduxProvider>
    </NavigationContainer>
  );
}


// Register the component manually since it isn't at the root directory.
registerRootComponent(App);
