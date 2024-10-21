import { View, Text, StyleSheet } from "react-native";
import { CustomButton } from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

interface NumberStatsProps {
  number: number;
  relativeFrequency: number;
  onAdd: () => void;
}

export function NumberStats({
  number,
  relativeFrequency,
  onAdd,
}: NumberStatsProps) {
  const textColor = useThemeColor({}, "text");

  const expectedFreq = Math.min(number - 1, 13 - number);

  return (
    <View style={styles.numberStatsContainer}>
      <CustomButton style={styles.numberButton} onPress={onAdd}>
        <Text style={styles.numberButtonText}>{"" + number}</Text>
      </CustomButton>
      <View style={styles.numberStats}>
        <View
          style={[
            styles.numberActualStatsBar,
            { width: `${relativeFrequency * 100}%` },
          ]}
        >
          <Text></Text>
        </View>
        <View style={styles.numberExpectedStats}>
          {new Array(expectedFreq).fill(null).map((_, i) => (
            <Ionicons key={i} name="ellipse" color={textColor} size={24} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberStatsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 20,
  },
  numberButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#941f2e",
    borderRadius: 8,
    width: 50,
  },
  numberButtonText: {
    color: "#fcd657",
    fontSize: 20,
    fontWeight: "bold",
  },
  numberStats: {
    flexGrow: 1,
  },
  numberExpectedStats: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  numberActualStatsBar: {
    position: "absolute",
    backgroundColor: "rgba(252, 214, 87, 0.4)",
    height: "100%",
  },
});
