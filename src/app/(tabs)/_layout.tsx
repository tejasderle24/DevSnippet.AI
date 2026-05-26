import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabsLayout() {
const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subText,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.3,
          paddingBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={focused ? theme.primary : theme.subText}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={22}
              color={focused ? theme.primary : theme.subText}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={22}
              color={focused ? theme.primary : theme.subText}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "folder" : "folder-outline"}
              size={22}
              color={focused ? theme.primary : theme.subText}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? [styles.activeTabWrapper, { backgroundColor: theme.cardAlt }] : null}>
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={22}
                color={focused ? theme.primary : theme.subText}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeTabWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
