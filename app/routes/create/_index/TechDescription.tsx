import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Technology } from "~/routes/stacks/_index/types";

type Props = {
  tech: Technology;
  setSelectedTechs: React.Dispatch<React.SetStateAction<Technology[]>>;
};

export default function TechDescription({ tech, setSelectedTechs }: Props) {
  const [newDesc, setNewDesc] = useState("");
  const [isEdit, setIsEdit] = useState(true);

  function deleteTech(techName: string) {
    try {
      setSelectedTechs((prev) => prev.filter((tech) => tech.name !== techName));
    } catch (error) {
      console.error("Failed to delete tech from selected techs:", error);
    }
  }

  function saveDescription(desc: string) {
    try {
      setSelectedTechs((prev) => {
        const updatedTechs = prev.map((t) => {
          if (t.name === tech.name) {
            return { ...t, description: desc };
          }
          return t;
        });
        console.log(updatedTechs);
        return updatedTechs;
      });
    } catch (error) {
      console.error("Failed to update tech description:", error);
    }
  }

  return (
    <Card key={tech.name} className="p-6 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">{tech?.name}</h3>

            <Badge>{tech?.tag}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={tech?.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
      {isEdit ? (
        <Textarea
          name="techDescription"
          value={newDesc}
          maxLength={500}
          placeholder="Explain how you use this tech in your workflow..."
          rows={3}
          className="resize-none w-full"
          onChange={(e) => setNewDesc(e.target.value)}
        />
      ) : (
        <p>{tech.description}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button
          className="w-[25%]"
          variant={"outline"}
          onClick={() => deleteTech(tech.name)}
        >
          Delete
        </Button>
        {isEdit ? (
          <Button
            type="button"
            className="w-[25%] self-end"
            onClick={() => {
              saveDescription(newDesc);
              setIsEdit(false);
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            type="button"
            className="w-[25%]"
            onClick={() => {
              saveDescription(tech.description);
              setIsEdit(true);
            }}
          >
            Edit
          </Button>
        )}
      </div>
    </Card>
  );
}
