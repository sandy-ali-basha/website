import create from "zustand";

export const ValueStore = create((set) => ({
  value: null,
  setValue: (id) => {
    set(() => ({ value: id }));
  },
}));
