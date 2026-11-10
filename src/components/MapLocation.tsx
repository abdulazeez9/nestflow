import { Property } from "@/types/property";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapProps {
  properties: Property[];
}

export default function MapLocation({ properties }: MapProps) {
  const router = useRouter();

  const first = properties[0]?.location;

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      userInterfaceStyle="light"
      initialRegion={{
        latitude: first?.latitude,
        longitude: first?.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }}
    >
      {properties.map((p) => (
        <Marker
          key={p.id}
          coordinate={{
            latitude: p.location.latitude,
            longitude: p.location.longitude,
          }}
          title={p.title}
          description={p.location.address}
          onCalloutPress={() => router.push(`/property/${p.id}`)}
        />
      ))}
    </MapView>
  );
}
