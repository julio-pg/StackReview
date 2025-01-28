import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import ErrorComponent from "~/components/ErrorComponent";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Technology } from "~/routes/stacks/_index/types";
import {
  getAllTechnologies,
  handleCreateStack,
} from "~/services/Stacks/Stacks";
import { requireUserSession } from "~/services/session.server";
import { useUserStore } from "~/store/userStore/userStore";
import TechDescription from "./TechDescription";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  const techs = await getAllTechnologies();
  return { techs };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const creatorId = formData.get("creatorId") as string;

  const stackErrors = await handleCreateStack(formData);
  if (stackErrors) {
    return stackErrors;
  }

  return redirect(`/dashboard?userId=${creatorId}`);
};

export default function CreatePage() {
  const { techs } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const { user } = useUserStore();
  const [selectedTechs, setSelectedTechs] = useState<Technology[]>(
    [] as Technology[]
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [frameworks, setFrameworks] = useState<Technology[]>(
    [] as Technology[]
  );

  const handleTechSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTech = frameworks.find(
      (framework) => framework.name === event.target.value
    );
    if (
      selectedTech &&
      !selectedTechs.some((tech) => tech.name === selectedTech.name)
    ) {
      setSelectedTechs((prev) => [...prev, selectedTech]);
    }
  };

  useEffect(() => {
    setFrameworks(techs[selectedCategory]);
    setSelectedTechs([]);
  }, [selectedCategory, techs]);

  return (
    <div className="bg-background px-8 py-8 mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-2">Create New Stack</h1>
        <h2 className="text-muted-foreground">
          Share your favorite technology combinations with the community.
        </h2>
      </div>
      <Form className="space-y-4" method="post">
        <div className="space-y-2">
          <Label htmlFor="title">Stack Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Modern Web Development Stack"
            maxLength={100}
          />
          <ErrorComponent text={errors?.title?.toString()} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            maxLength={1000}
            placeholder="Describe your technology stack and its benefits..."
            rows={5}
            className="resize-none"
          />
          <ErrorComponent text={errors?.description?.toString()} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categories">Category</Label>
          <select
            id="categories"
            name="category"
            value={selectedCategory}
            defaultValue={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
          <ErrorComponent text={errors?.category?.toString()} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techs">Techs</Label>
          <select
            id="techs"
            defaultValue=""
            onChange={handleTechSelection}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              Select a framework
            </option>
            {frameworks?.map((framework) => (
              <option value={framework.name} key={framework.name}>
                {framework.name}
              </option>
            ))}
          </select>
          <ErrorComponent text={errors?.technologies?.toString()} />
          <p>Selected Techs:</p>
          <div className="flex flex-col flex-wrap gap-2">
            {selectedTechs.map((tech, index) => (
              <TechDescription
                key={index}
                tech={tech}
                setSelectedTechs={setSelectedTechs}
              />
            ))}
          </div>
          <Input className="hidden" name="creatorId" value={user?.id} />
          <Input
            className="hidden"
            name="technologies"
            value={JSON.stringify(selectedTechs)}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Stack
        </Button>
      </Form>
    </div>
  );
}

const categories = ["programming", "design", "marketing", "business"];
