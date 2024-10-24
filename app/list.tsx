import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { MenuButton } from "@/components/MenuButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAllGameKeys } from "@/hooks/useAllGameKeys";
import { useThemeColor } from "@/hooks/useThemeColor";

const groupByDate = (allKeys?: string[]) => {
  const grouped: Array<{
    day: Date;
    games: Array<{ key: string; fullDate: Date }>;
  }> = [];
  [...(allKeys ?? [])].reverse().forEach((key) => {
    const fullDate = new Date(key);
    const day = new Date(
      fullDate.getFullYear(),
      fullDate.getMonth(),
      fullDate.getDate()
    );
    if (
      grouped.length === 0 ||
      grouped[grouped.length - 1].day.getTime() !== day.getTime()
    ) {
      grouped.push({ day, games: [] });
    }
    grouped[grouped.length - 1].games.push({ key, fullDate });
  });

  return grouped;
};

export default function List() {
  const { allKeys } = useAllGameKeys();

  const grouped = useMemo(() => groupByDate(allKeys), [allKeys]);

  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.listContainer}>
      <ScrollView>
        {grouped?.map(({ day, games }) => (
          <View key={day.getTime()}>
            <View style={styles.dayHeader}>
              <View
                style={[{ backgroundColor: textColor }, styles.dayHeaderLine]}
              ></View>
              <ThemedText style={styles.dayHeaderText}>
                {day.toDateString()}
              </ThemedText>
              <View
                style={[{ backgroundColor: textColor }, styles.dayHeaderLine]}
              ></View>
            </View>
            <View style={styles.dayList}>
              {games.map(({ key, fullDate }) => (
                <MenuButton
                  key={key}
                  title={fullDate.toLocaleTimeString()}
                  onPress={() =>
                    router.navigate({
                      pathname: "/game/[id]",
                      params: { id: key },
                    })
                  }
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    height: "100%",
    padding: 10,
    gap: 10,
  },
  dayHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  dayHeaderLine: {
    flexGrow: 1,
    height: 1,
  },
  dayHeaderText: {
    fontSize: 18,
  },
  dayList: {
    display: "flex",
    gap: 10,
  },
});
