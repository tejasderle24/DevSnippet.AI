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
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(splash)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
