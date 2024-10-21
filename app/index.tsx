import { Image, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function Index() {
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require("@/assets/images/header-img.jpg")}
          style={styles.headerImg}
        />
      }
    >
      <ThemedView>
        <ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
  headerImg: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
