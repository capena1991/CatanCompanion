import { Image, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { MainMenuButton } from "@/components/MenuButton";

export default function Index() {
  return (
    <ThemedView style={styles.menuScreen}>
      <Image
        source={require("@/assets/images/header-img.jpg")}
        style={styles.headerImg}
      />
      <View style={styles.menuButtons}>
        <MainMenuButton
          icon="add-circle-outline"
          title="New Game"
          onPress={() => router.navigate("/game")}
        />
        <MainMenuButton
          icon="chevron-forward-circle-outline"
          title="Last Game"
          onPress={() => router.navigate("/game")}
        />
        <MainMenuButton icon="list-circle-outline" title="All Games" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menuScreen: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  menuButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 30,
    marginHorizontal: "20%",
    height: "67%",
  },
  headerImg: {
    height: "33%",
    width: "100%",
  },
});
