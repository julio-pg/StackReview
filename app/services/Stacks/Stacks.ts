import { Stack, StackResponse, Technology } from "~/routes/stacks/_index/types";
import AxiosInstance from "../axios";
import { RequestStack } from "~/routes/dashboard/types";
import { RequestReview } from "~/routes/stacks/$username/$id/types";

export async function createStack(data: RequestStack): Promise<Stack> {
  try {
    const response = await AxiosInstance.post<Stack>("/stacks/create", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    throw error;
  }
}
export async function deleteStack(stackId: string): Promise<Stack> {
  try {
    const response = await AxiosInstance.delete<Stack>(`/stacks/${stackId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    throw error;
  }
}

export async function createReview(data: RequestReview): Promise<Stack> {
  try {
    const response = await AxiosInstance.post<Stack>("/stacks/review", data);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}
export async function getAllStacks(
  page: number,
  limit?: number
): Promise<StackResponse> {
  try {
    const response = await AxiosInstance.get<StackResponse>("/stacks/all", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    return {
      data: [],
      metadata: { page: 0, limit: 0, total: 0, totalPages: 0 },
    };
  }
}

export async function getStackById(id: string): Promise<Stack> {
  try {
    const response = await AxiosInstance.get<Stack>(
      `/stacks/single-stack/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stack:", error);
    throw error;
  }
}

export async function getUserStacks(
  userId: string,
  page: number,
  limit: number
) {
  try {
    const response = await AxiosInstance.get<StackResponse>(
      "/stacks/user-stacks",
      {
        params: { userId, page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    throw error;
  }
}

export async function getTopRatedStacks(): Promise<Stack[]> {
  try {
    const response = await AxiosInstance.get<Stack[]>("/stacks/top-rated");
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    return [];
  }
}

export async function getAllTechnologies(): Promise<{
  [x: string]: Technology[];
}> {
  try {
    const response = await AxiosInstance.get("/stacks/all-technologies");
    return response.data;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return {};
  }
}
