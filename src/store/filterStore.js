import create from "zustand";

export const FilterStore = create((set) => ({
  value: null,
  setValue: (id) => {
    set(() => ({ value: id }));
  },
}));
