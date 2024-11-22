import { Stack } from "~/routes/stacks/_index/types";
import AxiosInstance from "../axios";

export const getAllStacks = async (): Promise<Stack[]> => {
  try {
    const response = await AxiosInstance.get<Stack[]>("/stacks/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    throw error;
  }
};
