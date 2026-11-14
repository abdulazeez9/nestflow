import { Text, View } from "react-native";

export default function MapScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        The map is available in the mobile app.
      </Text>
    </View>
  );
}
