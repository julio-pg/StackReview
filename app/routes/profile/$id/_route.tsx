import { Github, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUserStore } from "~/store/userStore/userStore";
import { getUserStacks } from "~/services/Stacks/Stacks";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { StackCreator } from "~/routes/stacks/_index/StackCreator";

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id;

  const userStacks = await getUserStacks(userId!);
  return { userStacks };
}

export default function ProfilePage() {
  const { user } = useUserStore();
  const { userStacks } = useLoaderData<typeof loader>();
  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user?.avatar} alt={"test"} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{user?.name}</p>
          {user?.github && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Github className="w-4 h-4" /> @{user?.github}
            </p>
          )}
          {user?.twitter && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Twitter className="w-4 h-4" /> @{user?.twitter}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">User Stacks</h1>
          <p className="text-muted-foreground mt-2">
            Explore and manage the technology stacks created by this user
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userStacks.map((stack, index) => (
          <StackCreator key={index} stack={stack} />
        ))}
      </div>

      {userStacks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No stacks yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first stack to share your favorite technology
              combinations with the community.
            </p>
            {/* <CreateStackModal /> */}
          </div>
        </div>
      )}
    </div>
  );
}
