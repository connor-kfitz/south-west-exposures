import { User } from "@/types/admin";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface useUserReturn {
  user: User;
  loading: boolean;
}

export function useUser(): useUserReturn {
  const [user, setUser] = useState<User>({name: "", email: "", profileImage: ""});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  },[]);

  async function fetchUsers(): Promise<void> {
    try {
      const response = await fetch("/api/admin/user/get");
      if (!response.ok) throw new Error(`${response.status}`);
      const user = await response.json();
      setUser(user);
    } catch {
      signOut({ callbackUrl: "/auth" })
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading
  }
}
