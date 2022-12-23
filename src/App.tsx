import { registerRootComponent } from 'expo';
import { Text, View as RNView } from "react-native";
import { styled } from "nativewind";
const View = styled(RNView);

export default function App() {
  return (
    <View className="flex-1 items-center justify-end bg-blue-300 text-white">
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

registerRootComponent(App);