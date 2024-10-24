import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/useColorScheme";

const queryClient = new QueryClient();

const getGameLabel = (id: string | undefined) => {
  if (id === undefined) {
    return "Invalid";
  }
  const decoded = decodeURIComponent(id);
  if (decoded === "new-game") {
    return "New Game";
  }
  return new Date(decoded).toLocaleString();
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="game/[id]"
            options={({ route }) => ({
              headerStyle: { backgroundColor: "#c35f3d" },
              headerTitle: `Stats - ${getGameLabel(
                (route?.params as { id: string } | undefined)?.id
              )}`,
            })}
          />
          <Stack.Screen
            name="list"
            options={{
              headerStyle: { backgroundColor: "#c35f3d" },
              headerTitle: "All Games",
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
