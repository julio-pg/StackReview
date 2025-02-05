import { Form } from "@remix-run/react";
import { LogOut } from "lucide-react";
import { useUserStore } from "~/store/userStore/userStore";

export default function LogoutButton() {
  const { setUser } = useUserStore();

  const logout = () => {
    setUser(null);
  };
  return (
    <Form action="/logout" method="post" onSubmit={logout}>
      <button className="flex" type="submit">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sign out</span>
      </button>
    </Form>
  );
}
