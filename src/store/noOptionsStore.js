import create from "zustand";

export const useNoOptionsStore = create((set) => ({
  noOptionsForCity: false,
  setNoOptionsForCity: (value) => {
    set(() => ({ noOptionsForCity: Boolean(value) }));
  },
}));
