// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { useTheme } from "@/context/ThemeContext";

// interface SnippetCardProps {
//   filename: string;
//   code: string;
//   title: string;
//   timeAgo: string;
// }

// export default function SnippetCard({ filename, code, title, timeAgo }: SnippetCardProps) {
//   const { theme } = useTheme();

//   return (
//     <View style={[styles.card, { backgroundColor: "#121214", borderColor: "#232329" }]}>
//       {/* Window Header Decorator */}
//       <View style={styles.cardHeader}>
//         <View style={styles.dots}>
//           <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
//           <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
//           <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
//         </View>
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
//     </View>
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
//    justifyContent: "space-between",
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
//     color: "#a78bfa", // Base code color (You can customize color parsing here)
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

interface SnippetCardProps {
  id: string; // Added ID to track dynamic routing/state passing
  filename: string;
  code: string;
  title: string;
  timeAgo: string;
  tags?: string[];
}

export default function SnippetCard({ id, filename, code, title, timeAgo, tags = ["TYPESCRIPT"] }: SnippetCardProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    // Navigate using Expo Router and pass the card details as parameters
    router.push({
      pathname: "/home/snippet-details",
      params: { id, filename, code, title, timeAgo, tags: JSON.stringify(tags) }
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handlePress}
      style={[styles.card, { backgroundColor: "#121214", borderColor: "#232329" }]}
    >
      {/* Window Header Decorator */}
      <View style={styles.cardHeader}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
          <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
          <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
        </View>
        <Text style={styles.filename}>{filename}</Text>
      </View>

      {/* Code Block Window */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeText} numberOfLines={6}>
          {code}
        </Text>
      </View>

      {/* Card Footer Text */}
      <View style={styles.cardFooter}>
        <Text style={[styles.title, { color: theme.text || "#ffffff" }]}>{title}</Text>
        <Text style={styles.timeText}>{timeAgo}</Text>
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
    alignItems: "center",
    marginBottom: 12,
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
  filename: {
    color: "#808086",
    fontSize: 12,
    fontFamily: "monospace",
    marginLeft: "auto",
  },
  codeContainer: {
    backgroundColor: "#09090b",
    borderRadius: 8,
    padding: 14,
    minHeight: 100,
  },
  codeText: {
    color: "#a78bfa",
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeText: {
    color: "#71717a",
    fontSize: 13,
  },
});