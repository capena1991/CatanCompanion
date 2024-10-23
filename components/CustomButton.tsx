import {
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
  type ViewProps,
  StyleSheet,
} from "react-native";

interface CustomButtonProps {
  children: React.ReactNode;
  onPress?: TouchableOpacityProps["onPress"];
  disabled?: boolean;
  style?: ViewProps["style"];
}

export function CustomButton({
  children,
  onPress,
  style,
  disabled,
}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.default, style, disabled ? styles.disabled : {}]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: "rgb(33, 150, 243)",
    borderRadius: 2,
    padding: 10,
    alignItems: "center",
    color: "#ffffff",
    fontSize: 24,
  },
  disabled: {
    backgroundColor: "#625053",
  },
});
