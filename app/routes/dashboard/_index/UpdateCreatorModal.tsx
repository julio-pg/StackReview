import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { Form, useNavigate } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUserStore } from "~/store/userStore/userStore";
import { AtSign, BriefcaseBusiness, Github, Twitter, User } from "lucide-react";
import { CreatorErrors } from "../types";
import ErrorComponent from "~/components/ErrorComponent";
import { Button } from "~/components/ui/button";

type Props = {
  errors?: CreatorErrors;
};

export default function UpdateCreatorModal({ errors }: Props) {
  const { user } = useUserStore();

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/dashboard`);
  };
  return (
    <Dialog
      open={true}
      onOpenChange={(open: boolean) => {
        open ? () => {} : handleClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form className="space-y-4" method="post">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User /> Name
            </Label>
            <Input name="name" placeholder="e.g. John Doe" maxLength={100} />
            <ErrorComponent text={errors?.name?.toString()} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AtSign />
              Username
            </Label>
            <Input name="username" placeholder="e.g. john123" maxLength={100} />
            <ErrorComponent text={errors?.username?.toString()} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BriefcaseBusiness />
              Expertise
            </Label>
            <Input
              name="expertise"
              placeholder="e.g. Software Engineer"
              maxLength={100}
            />
            <ErrorComponent text={errors?.expertise?.toString()} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              {" "}
              <Github /> Github
            </Label>
            <Input
              name="github"
              placeholder="your github handle"
              maxLength={100}
            />
            <ErrorComponent text={errors?.github?.toString()} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Twitter /> Twitter
            </Label>
            <Input
              name="twitter"
              placeholder="your twitter handle"
              maxLength={100}
            />
            <ErrorComponent text={errors?.twitter?.toString()} />
          </div>
          <Input
            className="hidden"
            name="creatorId"
            value={user?.id}
            readOnly
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
