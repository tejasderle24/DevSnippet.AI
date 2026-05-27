// // import React from "react";
// // import { View, Text, StyleSheet } from "react-native";
// // import { useTheme } from "@/context/ThemeContext";

// // interface SnippetCardProps {
// //   filename: string;
// //   code: string;
// //   title: string;
// //   timeAgo: string;
// // }

// // export default function SnippetCard({ filename, code, title, timeAgo }: SnippetCardProps) {
// //   const { theme } = useTheme();

// //   return (
// //     <View style={[styles.card, { backgroundColor: "#121214", borderColor: "#232329" }]}>
// //       {/* Window Header Decorator */}
// //       <View style={styles.cardHeader}>
// //         <View style={styles.dots}>
// //           <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
// //           <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
// //           <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
// //         </View>
// //         <Text style={styles.filename}>{filename}</Text>
// //       </View>

// //       {/* Code Block Window */}
// //       <View style={styles.codeContainer}>
// //         <Text style={styles.codeText} numberOfLines={6}>
// //           {code}
// //         </Text>
// //       </View>

// //       {/* Card Footer Text */}
// //       <View style={styles.cardFooter}>
// //         <Text style={[styles.title, { color: theme.text || "#ffffff" }]}>{title}</Text>
// //         <Text style={styles.timeText}>{timeAgo}</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   card: {
// //     borderRadius: 16,
// //     borderWidth: 1,
// //     padding: 16,
// //     marginBottom: 16,
// //   },
// //   cardHeader: {
// //     flexDirection: "row",
// //    justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 12,
// //   },
// //   dots: {
// //     flexDirection: "row",
// //     gap: 6,
// //   },
// //   dot: {
// //     width: 8,
// //     height: 8,
// //     borderRadius: 4,
// //   },
// //   filename: {
// //     color: "#808086",
// //     fontSize: 12,
// //     fontFamily: "monospace",
// //     marginLeft: "auto",
// //   },
// //   codeContainer: {
// //     backgroundColor: "#09090b",
// //     borderRadius: 8,
// //     padding: 14,
// //     minHeight: 100,
// //   },
// //   codeText: {
// //     color: "#a78bfa", // Base code color (You can customize color parsing here)
// //     fontFamily: "monospace",
// //     fontSize: 13,
// //     lineHeight: 18,
// //   },
// //   cardFooter: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: 16,
// //   },
// //   title: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// //   timeText: {
// //     color: "#71717a",
// //     fontSize: 13,
// //   },
// // });


// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useTheme } from "@/context/ThemeContext";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// interface SnippetCardProps {
//   id: string; // Added ID to track dynamic routing/state passing
//   filename: string;
//   code: string;
//   title: string;
//   timeAgo: string;
//   tags?: string[];
//   isFavorite?: boolean;
//   onToggleFavorite?: (id: string) => void;
// }

// export default function SnippetCard({
//   id,
//   filename,
//   code,
//   title,
//   timeAgo,
//   tags = ["TYPESCRIPT"],
//   isFavorite = false,
//   onToggleFavorite,
// }: SnippetCardProps) {
//   const { theme } = useTheme();
//   const router = useRouter();

//   const handlePress = () => {
//     // Navigate using Expo Router and pass the card details as parameters
//     router.push({
//       pathname: "/home/snippet-details",
//       params: { id, filename, code, title, timeAgo, tags: JSON.stringify(tags) }
//     });
//   };

//   return (
//     <TouchableOpacity 
//       activeOpacity={0.8} 
//       onPress={handlePress}
//       style={[styles.card, { backgroundColor: "#121214", borderColor: "#232329" }]}
//     >
//       {/* Window Header Decorator */}
//       <View style={styles.cardHeader}>
//         <View style={styles.dots}>
//           <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
//           <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
//           <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
//         </View>
//         <TouchableOpacity onPress={() => onToggleFavorite?.(id)}>
//           <Ionicons name={isFavorite ? "star" : "star-outline"} size={18} color={isFavorite ? "#facc15" : "#808086"} />
//         </TouchableOpacity>
//         <Text style={styles.filename}>{filename}</Text>
//       </View>

//       {/* Code Block Window */}
//       <View style={styles.codeContainer}>
//         <Text style={styles.codeText} numberOfLines={6}>
//           {code}
//         </Text>
//       </View>

//       {/* Card Footer Text */}
//       <View style={styles.cardFooter}>
//         <Text style={[styles.title, { color: theme.text || "#ffffff" }]}>{title}</Text>
//         <Text style={styles.timeText}>{timeAgo}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 16,
//     borderWidth: 1,
//     padding: 16,
//     marginBottom: 16,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   dots: {
//     flexDirection: "row",
//     gap: 6,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   filename: {
//     color: "#808086",
//     fontSize: 12,
//     fontFamily: "monospace",
//     marginLeft: "auto",
//   },
//   codeContainer: {
//     backgroundColor: "#09090b",
//     borderRadius: 8,
//     padding: 14,
//     minHeight: 100,
//   },
//   codeText: {
//     color: "#a78bfa",
//     fontFamily: "monospace",
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   cardFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 16,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   timeText: {
//     color: "#71717a",
//     fontSize: 13,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface SnippetCardProps {
  id: string; 
  filename: string;
  code: string;
  title: string;
  timeAgo: string;
  tags?: string[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function SnippetCard({
  id,
  filename,
  code,
  title,
  timeAgo,
  tags = ["TYPESCRIPT"],
  isFavorite = false,
  onToggleFavorite,
}: SnippetCardProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/home/snippet-details",
      params: { id, filename, code, title, timeAgo, tags: JSON.stringify(tags) }
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.85} 
      onPress={handlePress}
      style={[styles.card, { backgroundColor: "#121214", borderColor: "#1e1e24" }]}
    >
      {/* Window Header Layout with Favorite Icon Restored */}
      <View style={styles.cardHeader}>
        {/* Left Side: Window Controls */}
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
          <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
          <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
        </View>
        
        {/* Right Side: Favorite Trigger + Filename */}
        <View style={styles.headerRight}>
          <TouchableOpacity 
            onPress={() => onToggleFavorite?.(id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.favoriteBtn}
          >
            <Ionicons 
              name={isFavorite ? "star" : "star-outline"} 
              size={16} 
              color={isFavorite ? "#facc15" : "#636366"} 
            />
          </TouchableOpacity>
          <Text style={styles.filename}>{filename}</Text>
        </View>
      </View>

      {/* Embedded Code Window Workspace */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeText} numberOfLines={6}>
          {code}
        </Text>
      </View>

      {/* Card Footer Info Structure */}
      <View style={styles.cardFooter}>
        <Text style={[styles.title, { color: theme.text || "#ffffff" }]}>
          {title}
        </Text>
        <Text style={styles.timeText}>
          {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  favoriteBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  filename: {
    color: "#a0a0a5",
    fontSize: 12,
    fontFamily: "monospace",
  },
  codeContainer: {
    backgroundColor: "#09090b",
    borderWidth: 1,
    borderColor: "#18181b",
    borderRadius: 10,
    padding: 16,
    minHeight: 110,
  },
  codeText: {
    color: "#c084fc", 
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 19,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  timeText: {
    color: "#71717a",
    fontSize: 13,
  },
});