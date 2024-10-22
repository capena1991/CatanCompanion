import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { NumberStats } from "@/components/NumberStats";
import { ThemedView } from "@/components/ThemedView";
import { useGameStats } from "@/hooks/useGameStats";
import { MenuButton } from "@/components/MenuButton";
import { SingleSummaryStat } from "@/components/SingleSummaryStat";

export default function Game({}) {
  const [diceThrows, setDiceThrows] = useState<number[]>([]);

  const { actual, expected, chiSquared } = useGameStats(diceThrows);

  return (
    <ThemedView style={styles.statsContainer}>
      <View style={styles.numberStatsContainer}>
        {new Array(11).fill(null).map((_, i) => (
          <NumberStats
            key={i}
            number={i + 2}
            relativeFrequency={actual.normalizedFreqs[i]}
            onAdd={() => setDiceThrows([...diceThrows, i + 2])}
          />
        ))}
      </View>
      <View style={styles.summaryStatsContainer}>
        <SingleSummaryStat
          name="Mean"
          expected={expected.mean}
          actual={actual.mean}
        />
        <SingleSummaryStat
          name="STD"
          expected={expected.standardDeviation}
          actual={actual.standardDeviation}
        />
        <SingleSummaryStat
          name="Variance"
          expected={expected.variance}
          actual={actual.variance}
        />
        <SingleSummaryStat name="χ²" expected={"<18.3"} actual={chiSquared.x} />
        <SingleSummaryStat
          name="p-value"
          expected=">5%"
          actual={chiSquared.pValue}
          percentage
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.singleButtonContainer}>
          <MenuButton
            title="Undo"
            icon="arrow-undo-circle-outline"
            onPress={() => setDiceThrows(diceThrows.slice(0, -1))}
          />
        </View>
        <View style={styles.singleButtonContainer}>
          <MenuButton
            title="Reset"
            icon="refresh-circle-outline"
            onPress={() => setDiceThrows([])}
          />
        </View>
        <View style={styles.singleButtonContainer}>
          <MenuButton
            title="Finish"
            icon="stop-circle-outline"
            onPress={() => router.navigate("/")}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    padding: 10,
    gap: 20,
  },
  numberStatsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  summaryStatsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  singleButtonContainer: {
    flexGrow: 1,
  },
});
