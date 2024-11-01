import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface SingleSummaryStatProps {
  name: string;
  expected: number | string;
  actual: number | string;
  percentage?: boolean;
  status?: "ok" | "warning" | "failed";
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
  status = "ok",
}: SingleSummaryStatProps) {
  return (
    <View
      style={[
        styles.singleSummaryStat,
        status === "failed"
          ? styles.error
          : status === "warning"
          ? styles.warning
          : styles.ok,
      ]}
    >
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
    padding: 0,
  },
  ok: {},
  warning: {
    backgroundColor: "rgba(252, 214, 87, 0.4)",
  },
  error: {
    backgroundColor: "rgba(255, 51, 51, 0.4)",
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
