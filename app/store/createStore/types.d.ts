import { Technology } from "~/routes/stacks/_index/types";

export interface CreateState {
  selectedTechs: Technology[];
  setSelectedTechs: (tech: Technology | null) => void;
}
