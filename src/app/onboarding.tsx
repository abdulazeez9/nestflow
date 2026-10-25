import Screen from "@/components/ui/Screen";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const steps = [
  {
    title: "Discover amazing properties",
    description:
      "Buy, rent or invest in the best properties with ease and confidence.",
    image: require("@/assets/images/onboarding.webp"),
  },
  {
    title: "Trust & Secure",
    description: "Verified listing, secure payments and dedicated support.",
    image: require("@/assets/images/onboarding2.webp"),
  },
  {
    title: "Your dream home is just a few taps away",
    description: "Explore thousands of properties across different locations.",
    image: require("@/assets/images/onboarding3.webp"),
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.replace("/sign-in");
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <Screen>
      <View className="flex-1 justify-around ">
        <Pressable
          onPress={() => router.replace("/sign-in")}
          className="items-end"
        >
          <Text>Skip</Text>
        </Pressable>

        <View className="items-center ">
          <Image
            source={step.image}
            style={{ width: 288, height: 288, borderRadius: 12 }}
            resizeMode="cover"
          />
        </View>
        <View className="items-center gap-4">
          <Text className="text-2xl text-center text-navy font-extrabold">
            {step.title}
          </Text>
          <Text className="text-center font-bold  text-content-placeholder">
            {step.description}
          </Text>
        </View>

        <View className="gap-6">
          <View className="flex-row gap-2 justify-center">
            {steps.map((_, i) => (
              <View
                key={i}
                className={`h-2 rounded-full ${i === current ? "w-2 bg-primary " : "w-2 bg-gray-300 "}`}
              />
            ))}
          </View>

          <Pressable
            onPress={handleNext}
            className="bg-primary rounded-xl p-4 items-center"
          >
            <Text className="text-white">
              {isLast ? "Get Started" : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
