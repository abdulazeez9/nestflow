import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        })),
    }),
    {
      name: "nestflow:favorites",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ favorites: s.favorites }),
    },
  ),
);
