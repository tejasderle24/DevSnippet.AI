// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
// <Stack>
//   <Stack.Screen
//     name="(tabs)"
//     options={{ headerShown: false }}
//   />
// </Stack>
//   );
// }

import { ThemeProvider } from "@/context/ThemeContext";
import { AppDataProvider } from "@/context/AppDataContext";
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppDataProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </AppDataProvider>
    </ThemeProvider>
  );
}
