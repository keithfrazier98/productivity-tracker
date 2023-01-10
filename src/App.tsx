import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./components/HomePage";
import GoalsPage from "./features/goals/GoalsPage";
import { GoalTypes } from "./types";
import EditGoalsPage from "./features/goals/EditGoalsPage";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import ProgressPage from "./features/goals/ProgressPage";
import { Provider as PaperProvider } from "react-native-paper";
import ReflectionPage from "./features/reflection/ReflectionPage";
import NewEntryPage from "./features/reflection/NewEntryPage";
const Stack = createNativeStackNavigator();

export default function App() {
  const goalTypes: GoalTypes[] = ["Daily", "Monthly", "Yearly"];

  return (
    <NavigationContainer>
      <PaperProvider>
        <ReduxProvider store={store}>
          <Stack.Navigator initialRouteName="Home">
            {/**Home page */}
            <Stack.Screen name="Home" component={HomePage} />

            {/**Different goal pages, daily, monthly, yearly */}
            {goalTypes.map((goalType) => (
              <Stack.Screen name={`${goalType} Goals`}>
                {(props) => <GoalsPage {...props} goalType={goalType} />}
              </Stack.Screen>
            ))}

            {/**Log daily points page */}
            <Stack.Screen name="Progress" component={ProgressPage} />

            {/**Edit goals page */}
            <Stack.Screen name="Edit Goals" component={EditGoalsPage} />

            {/**Refleciton page */}
            <Stack.Screen name="Reflection" component={ReflectionPage} />

            {/**New reflection entry page */}
            <Stack.Screen name="New Entry" component={NewEntryPage} />
          </Stack.Navigator>
        </ReduxProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

// Register the component manually since it isn't at the root directory.
registerRootComponent(App);
