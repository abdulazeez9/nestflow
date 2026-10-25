import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 32 }}
    >
      {children}
    </SafeAreaView>
  );
}
