import { View, StyleSheet } from "react-native";
import { NumberStats } from "@/components/NumberStats";
import { ThemedView } from "@/components/ThemedView";
import { useMemo, useState } from "react";

export default function Game({}) {
  const [diceThrows, setDiceThrows] = useState<number[]>([]);

  const normalizedFreqs = useMemo(() => {
    const freqs = new Array<number>(11).fill(0);
    diceThrows.forEach((n) => {
      freqs[n - 2] += 1;
    });
    const maxFreq = Math.max(...freqs);
    return freqs.map((f) => f / maxFreq);
  }, [diceThrows]);

  return (
    <ThemedView style={styles.statsContainer}>
      {new Array(11).fill(null).map((_, i) => (
        <NumberStats
          key={i}
          number={i + 2}
          relativeFrequency={normalizedFreqs[i]}
          onAdd={() => setDiceThrows([...diceThrows, i + 2])}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: 10,
    padding: 10,
  },
});
