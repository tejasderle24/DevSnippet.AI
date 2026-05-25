import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Active and Inactive text colors
        tabBarActiveTintColor: '#A5C5E6', // Light slate blue text color from the active tab text
        tabBarInactiveTintColor: '#8E8E93', // Muted gray for inactive tabs
        
        // Tab label configurations
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.3,
          paddingBottom: 4,
        },
        
        // Tab bar structural styles matching the layout
        tabBarStyle: {
          backgroundColor: '#0A0A0C', // Deep black background matching the app
          borderTopWidth: 1,
          borderTopColor: '#1C1C1E', // Distinct dark top border separator
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      {/* 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={22} 
              color={focused ? '#A5C5E6' : '#8E8E93'} 
            />
          ),
        }}
      />

      {/* 2. SEARCH TAB (Added from your original design UI image) */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "search" : "search-outline"} 
              size={22} 
              color={focused ? '#A5C5E6' : '#8E8E93'} 
            />
          ),
        }}
      />

      {/* 3. FAVORITES TAB */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "star" : "star-outline"} // Changed to stars to match your visual UI design
              size={22} 
              color={focused ? '#A5C5E6' : '#8E8E93'} 
            />
          ),
        }}
      />

      {/* 4. FILES TAB */}
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "folder" : "folder-outline"} 
              size={22} 
              color={focused ? '#A5C5E6' : '#8E8E93'} 
            />
          ),
        }}
      />

      {/* 5. SETTINGS TAB (With active background container styling) */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeTabWrapper : null}>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={22} 
                color={focused ? '#A5C5E6' : '#8E8E93'} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // Recreates the capsule pill-shaped highlight block behind the active settings icon 
  activeTabWrapper: {
    backgroundColor: '#1C1C24', 
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});