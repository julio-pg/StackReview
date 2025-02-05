// import { useUserStore } from "~/store/userStore/userStore";
import { Button } from "./ui/button";
// import { toast } from "~/hooks/use-toast";
import { Form } from "@remix-run/react";
// import { useEffect } from "react";

export default function GoogleLoginButton() {
  // const { setUser } = useUserStore();

  return (
    <Form action="/auth/google" method="post">
      <Button>Login with Google</Button>
    </Form>
    // <Button onClick={() => login()} variant={"outline"}>
    //   Login
    // </Button>
  );
}
