import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -5,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );
    };

    const anim1 = animateDot(dot1, 0);
    const anim2 = animateDot(dot2, 150);
    const anim3 = animateDot(dot3, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View style={styles.bubble}>
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot1 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot2 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot3 }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    alignSelf: "flex-start",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#9CA3AF",
    marginHorizontal: 2,
  },
});
