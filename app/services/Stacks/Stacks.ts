import { Stack, StackResponse, Technology } from "~/routes/stacks/_index/types";
import AxiosInstance from "../axios";
import { RequestStack, UpdateCreatorRequest } from "~/routes/dashboard/types";
import { RequestReview } from "~/routes/stacks/$username/$id/types";
import { z } from "zod";
import { Creator } from "~/store/userStore/types";

export async function createStack(data: RequestStack): Promise<Stack> {
  try {
    const response = await AxiosInstance.post<Stack>("/stacks/create", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stacks:", error);
    throw error;
  }
}

export async function handleCreateStack(formData: FormData) {
  const updates: RequestStack = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    creatorId: formData.get("creatorId") as string,
    technologies: JSON.parse(formData.get("technologies") as string),
  };

  const stackSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    technologies: z
      .array(
        z.object({
          name: z.string(),
          category: z.string(),
          website: z.string(),
        })
      )
      .nonempty("At least one technology is required"),
  });

  const validationResult = stackSchema.safeParse(updates);
  if (!validationResult.success) {
    return validationResult.error.formErrors.fieldErrors;
  }
  await createStack(updates);
}

export async function updateCreator(
  creatorId: string,
  data: UpdateCreatorRequest
) {
  try {
    const response = await AxiosInstance.patch<Creator>(
      `/stacks/creator/${creatorId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating creator", error);
    throw error;
  }
}

export async function handleUpdateCreator(formData: FormData) {
  const creatorId = formData.get("creatorId") as string;
  const updates: UpdateCreatorRequest = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    expertise: formData.get("expertise") as string,
    github: formData.get("github") as string,
    twitter: formData.get("twitter") as string,
  };

  const stackSchema = z.object({
    name: z.string().min(1, "name is required"),
    username: z.string().min(1, "username is required"),
    expertise: z.string().min(1, "expertise is required"),
    github: z.string().min(1, "github is required"),
    twitter: z.string().min(1, "twitter is required"),
  });

  const validationResult = stackSchema.safeParse(updates);

  const response: { errors?: object; newCreator?: object } = {};
  if (!validationResult.success) {
    console.error("Validation failed:");
    response.errors = validationResult.error.formErrors.fieldErrors;
  }
  response.newCreator = await updateCreator(creatorId, updates);
  return response;
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
export async function getAllStacks({
  page,
  limit,
  category,
  rating,
}: {
  page: number;
  limit?: number;
  category?: string;
  rating?: string;
}): Promise<StackResponse> {
  try {
    const response = await AxiosInstance.get<StackResponse>("/stacks/all", {
      params: { page, limit, category, rating },
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
export async function getSingleUser(id: string) {
  try {
    const response = await AxiosInstance.get<Creator>(
      `/stacks/single-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
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
