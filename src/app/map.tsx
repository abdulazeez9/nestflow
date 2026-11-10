import MapLocation from "@/components/MapLocation";
import { properties } from "@/constants/data";
import { View } from "react-native";

export default function MapScreen() {
  return (
    <View className="flex-1">
      <MapLocation properties={properties} />
    </View>
  );
}
