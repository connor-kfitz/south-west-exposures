import { useRouter } from "next/navigation";
import { useState } from "react";

interface useIsotopesReturn {
  addError: string;
  postIsotope: (value?: string) => Promise<boolean>;
  deleteIsotope: (id: string) => Promise<string>;
}

export function useIsotopes(): useIsotopesReturn {

  const [addError, setAddError] = useState<string>("");

  const router = useRouter();

  async function postIsotope(value?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/isotopes/post", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: value })
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
            setAddError("Isotope value is required");
            break;
          case 409:
            setAddError("Duplicate value");
            break;
        }
      }
      return false;
    }
  }

  async function deleteIsotope(id: string): Promise<string> {
    if (!id) return "The Id for this Isotope was not found.";
    try {
      const response = await fetch(`/api/admin/products/isotopes/delete/${id}`, {
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
    postIsotope,
    deleteIsotope
  }
}
