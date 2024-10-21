import { Image, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
  return (
    <ThemedView style={styles.menuScreen}>
      <Image
        source={require("@/assets/images/header-img.jpg")}
        style={styles.headerImg}
      />
      <ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menuScreen: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  headerImg: {
    height: "33%",
    width: "100%",
  },
});
