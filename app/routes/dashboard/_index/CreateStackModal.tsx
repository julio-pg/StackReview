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
      </DialogContent>
    </Dialog>
  );
}
