import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface SingleSummaryStatProps {
  name: string;
  expected: number | string;
  actual: number | string;
  percentage?: boolean;
}

const formatStat = (x: number | string, percentage: boolean) => {
  if (typeof x === "string") {
    return x;
  }

  if (isNaN(x)) {
    return "—";
  }

  const mult = 10 * (percentage ? 100 : 1);
  const suffix = percentage ? "%" : "";
  return `${Math.round(x * mult) / 10}${suffix}`;
};

export function SingleSummaryStat({
  name,
  expected,
  actual,
  percentage,
}: SingleSummaryStatProps) {
  return (
    <View style={styles.singleSummaryStat}>
      <ThemedText style={[styles.statText, styles.statNameText]}>
        {name}
      </ThemedText>
      <ThemedText style={[styles.statText, styles.statExpectedText]}>
        {formatStat(expected, !!percentage)}
      </ThemedText>
      <ThemedText style={[styles.statText, styles.statActualText]}>
        {formatStat(actual, !!percentage)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  singleSummaryStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statText: {
    fontSize: 20,
  },
  statNameText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  statExpectedText: {},
  statActualText: {
    color: "rgba(252, 214, 87, 0.6)",
  },
});
