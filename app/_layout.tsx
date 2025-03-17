import { Stack } from "expo-router";
import { View, StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden /> 
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
