import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="create"
        options={{
          headerShown: false,
          title: "Create Snippet",
        }}
      />

      <Stack.Screen
        name="view-all"
        options={{
          headerShown: false,
          title: "All Snippet",
        }}
      />
    </Stack>
  );
}