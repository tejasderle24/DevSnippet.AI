// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// interface FavoriteCardProps {
//   title: string;
//   description: string;
//   langTag: string;
// }

// export default function FavoriteCard({ title, description, langTag }: FavoriteCardProps) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         {/* Simple inline representation of the pink heart icon */}
//         <Text style={styles.heartIcon}>❤️</Text>
//         <View style={styles.tag}>
//           <Text style={styles.tagText}>{langTag}</Text>
//         </View>
//       </View>
//       <Text style={styles.title} numberOfLines={1}>{title}</Text>
//       <Text style={styles.description} numberOfLines={2}>{description}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#121214",
//     borderColor: "#1e1e24",
//     borderWidth: 1,
//     borderRadius: 14,
//     padding: 14,
//     flex: 1, // dynamically sizing handles the grid layout widths
//     minWidth: "46%", 
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   heartIcon: {
//     fontSize: 18,
//   },
//   tag: {
//     backgroundColor: "#1e1e24",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   tagText: {
//     color: "#a0a0a5",
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   title: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 4,
//   },
//   description: {
//     color: "#a0a0a5",
//     fontSize: 12,
//     lineHeight: 16,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FavoriteCardProps {
  title: string;
  description: string;
  langTag: string;
  onPress?: () => void;
}

export default function FavoriteCard({ title, description, langTag, onPress }: FavoriteCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      {/* CARD HEADER: Heart Icon & Language Badge */}
      <View style={styles.header}>
        <Ionicons name="heart" size={20} color="#ff4b72" style={styles.heartIcon} />
        <View style={styles.tag}>
          <Text style={styles.tagText}>{langTag.toUpperCase()}</Text>
        </View>
      </View>
      
      {/* CARD BODY: Content & Typography */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111113",
    borderColor: "#1d1d22",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flex: 1,
    minWidth: "46%",
    // Subtle shadow to depth enhance the card backdrop
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heartIcon: {
    // Soft vibrant glow treatment styling can be adjusted here if needed
    transform: [{ scale: 1.05 }],
  },
  tag: {
    backgroundColor: "#19191d",
    borderWidth: 1,
    borderColor: "#26262c",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    color: "#52a372", // Accent color variant matching the terminal style tags
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  body: {
    gap: 4,
  },
  title: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.1,
  },
  description: {
    color: "#88888e",
    fontSize: 12,
    lineHeight: 17,
  },
});