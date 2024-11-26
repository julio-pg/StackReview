import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useUserStore } from "~/store/userStore";

export default function GoogleAutoLogin() {
  const setUser = useUserStore((state) => state.setUser);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const token = response.access_token; // Changed from credential to access_token
        const res = await fetch("/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          const user = await res.json();
          setUser(user); // Store the authenticated user in Zustand
        }
      } catch (error) {
        console.error("Auto-login failed", error);
      }
    },
    onError: () => {
      console.error("Auto-login failed");
    },
  });

  useEffect(() => {
    // Trigger Google One Tap login automatically
    login();
  }, [login]);

  return null;
}
