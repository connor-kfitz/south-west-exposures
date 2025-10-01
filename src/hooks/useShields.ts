import { useRouter } from "next/navigation";
import { useState } from "react";

interface useShieldsReturn {
  addError: string;
  postShield: (name?: string) => Promise<boolean>;
  deleteShield: (id: string) => Promise<string>;
}

export function useShields(): useShieldsReturn {

  const [addError, setAddError] = useState<string>("");

  const router = useRouter();

  async function postShield(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/shields/post", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      setAddError("");
      router.refresh();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        switch (statusCode) {
          case 400:
            setAddError("Shield name is required");
            break;
          case 409:
            setAddError("Duplicate name");
            break;
        }
      }
      return false;
    }
  }

  async function deleteShield(id: string): Promise<string> {
    if (!id) return "The Id for this Shield was not found.";
    try {
      const response = await fetch(`/api/admin/products/shields/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }
      router.refresh();
      return "";
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return "An unknown error occurred";
      }
    }
  }

  return {
    addError,
    postShield,
    deleteShield
  }
}
