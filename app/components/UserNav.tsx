import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { Link } from "@remix-run/react";
import { useUserStore } from "~/store/userStore/userStore";
import { googleLogout } from "@react-oauth/google";

type Props = {
  avatar: string;
  name: string;
  username: string;
  id: string;
};
export function UserNav({ avatar, name, username, id }: Props) {
  const { setUser } = useUserStore();

  const logout = () => {
    try {
      googleLogout();
      localStorage.removeItem("loginData");
      setUser(null);
      // Optionally, redirect to the login page or perform other actions after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatar} alt="User" />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">@{username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            to={{
              pathname: "/dashboard",
              search: `?userId=${id}`,
            }}
          >
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
