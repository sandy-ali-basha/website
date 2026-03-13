import create from "zustand";

export const useCityStore = create((set) => ({
  cities: [],
  setCities: (cities) => {
    set(() => ({ cities: Array.isArray(cities) ? cities : [] }));
  },
}));
