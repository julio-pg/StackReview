import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

import { Technology } from "~/routes/stacks/_index/types";
import { Badge } from "~/components/ui/badge";
import { Form, useNavigate } from "@remix-run/react";
import { useUserStore } from "~/store/userStore/userStore";
import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { StackErrors } from "../types";
import ErrorComponent from "~/components/ErrorComponent";

type Props = {
  errors?: StackErrors;
  techs: { [x: string]: Technology[] };
};
const categories = ["programming", "design", "marketing", "business"];

export default function CreateStackModal({ errors, techs }: Props) {
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

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/dashboard?userId=${user?.id}`);
  };
  const deleteTech = (techName: string) => {
    try {
      setSelectedTechs((prev) => prev.filter((tech) => tech.name !== techName));
    } catch (error) {
      console.error("Failed to delete tech from selected techs:", error);
    }
  };

  useEffect(() => {
    setFrameworks(techs[selectedCategory]);
    setSelectedTechs([]);
  }, [selectedCategory, techs]);
  return (
    <Dialog
      open={true}
      onOpenChange={(open: boolean) => {
        open ? () => {} : handleClose();
      }}
    >
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Stack</DialogTitle>
          <DialogDescription>
            Share your favorite technology combinations with the community.
          </DialogDescription>
        </DialogHeader>
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
            <div className="flex flex-wrap gap-2">
              {selectedTechs.map((tech) => (
                <Badge key={tech.name}>
                  {tech.name}{" "}
                  <CircleX
                    className="ml-2 cursor-pointer"
                    size={15}
                    onClick={() => deleteTech(tech.name)}
                  />
                </Badge>
              ))}
            </div>
            <Input className="hidden" name="creatorId" value={user?.id} />
            <Input
              className="hidden"
              name="technologies"
              value={JSON.stringify(selectedTechs)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Create Stack
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
