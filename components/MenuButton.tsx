import {
  View,
  Text,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { CustomButton } from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "@expo/vector-icons/build/createIconSet";

type IconSet<IconType> = IconType extends Icon<infer X, infer _Y> ? X : never;

interface MenuButtonProps {
  title?: string;
  icon?: IconSet<typeof Ionicons>;
  onPress?: TouchableOpacityProps["onPress"];
}

export function MenuButton({ title, icon, onPress }: MenuButtonProps) {
  return (
    <CustomButton onPress={onPress} style={styles.menuButton}>
      <View style={styles.menuButtonContent}>
        {icon && <Ionicons name={icon} size={24} color="#fcd657" />}
        {title && <Text style={styles.menuButtonText}>{title}</Text>}
      </View>
    </CustomButton>
  );
}

export function MainMenuButton({ title, icon, onPress }: MenuButtonProps) {
  return (
    <CustomButton onPress={onPress} style={styles.menuButton}>
      <View style={styles.menuButtonContent}>
        {icon && <Ionicons name={icon} size={32} color="#fcd657" />}
        {title && (
          <Text style={[styles.menuButtonText, styles.mainMenuButtonText]}>
            {title}
          </Text>
        )}
      </View>
    </CustomButton>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: "#941f2e",
    borderRadius: 8,
  },
  menuButtonContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  menuButtonText: {
    color: "#fcd657",
  },
  mainMenuButtonText: {
    fontSize: 32,
  },
});
