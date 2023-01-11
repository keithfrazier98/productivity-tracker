import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./components/HomePage";
import { GoalTypes } from "./types";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { Provider as PaperProvider } from "react-native-paper";

import {
  BrowseEntriesPage,
  ReflectionPage,
  TodaysEntry,
  ViewEntry,
} from "./features/reflection";

import {
  EditGoalsPage,
  GoalsPage,
  ProgressPage,
  ProgressSnapshotPage,
} from "./features/goals";

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

            {/**Progress snapshot page */}
            <Stack.Screen name="Snapshot" component={ProgressSnapshotPage} />

            {/**Edit goals page */}
            <Stack.Screen name="Edit Goals" component={EditGoalsPage} />

            {/**Refleciton page */}
            <Stack.Screen name="Reflection" component={ReflectionPage} />

            {/**New reflection entry page */}
            <Stack.Screen name="Today's Entry" component={TodaysEntry} />

            {/**View past entry page */}
            <Stack.Screen name="View Entry" component={ViewEntry} />

            {/**Browse entries page */}
            <Stack.Screen name="Browse Entries" component={BrowseEntriesPage} />
          </Stack.Navigator>
        </ReduxProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

// Register the component manually since it isn't at the root directory.
registerRootComponent(App);
