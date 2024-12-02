import { create } from "zustand";

import { CreateState } from "./types";

export const useCreateStore = create<CreateState>()((set) => ({
  selectedTechs: [],
  setSelectedTechs: (tech) => {
    set((state) => ({ selectedTechs: { ...state.selectedTechs, tech } }));
  },
}));
