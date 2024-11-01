import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useEffect, useRef } from "react";

interface RollsStripProps {
  rolls: number[];
}

export function RollsStrip({ rolls }: RollsStripProps) {
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => scrollRef.current?.scrollToEnd(), [rolls]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      style={styles.rollsStrip}
      contentContainerStyle={styles.rollsStripContent}
      showsHorizontalScrollIndicator={false}
    >
      {rolls.length ? (
        rolls.map((r, i) => (
          <ThemedView key={i} style={styles.singleRoll}>
            <ThemedText style={styles.singleRollText}>{r}</ThemedText>
          </ThemedView>
        ))
      ) : (
        <ThemedText style={styles.noRollsText}>No rolls yet</ThemedText>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rollsStrip: {
    flexGrow: 0,
    height: 34,
  },
  rollsStripContent: {
    display: "flex",
    gap: 5,
  },
  singleRoll: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#941f2e",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    color: "#ffffff",
    width: 30,
  },
  singleRollText: {
    color: "#fcd657",
    fontSize: 14,
  },
  noRollsText: {
    fontStyle: "italic",
    textAlignVertical: "center",
  },
});
