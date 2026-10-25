import { Image, Text, View } from "react-native";

interface AppLogoProps {
  textColor?: string;
  size?: number;
}

export default function AppLogo({
  textColor = "text-navy",
  size = 70,
}: AppLogoProps) {
  return (
    <View className="items-center gap-2">
      <Image
        source={require("@/assets/images/icon.png")}
        style={{ width: size, height: size }}
        resizeMode="cover"
      />
      <Text className={`text-3xl font-bold ${textColor}`}>Nestflow</Text>
    </View>
  );
}
