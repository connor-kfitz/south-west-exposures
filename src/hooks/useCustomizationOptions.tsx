import { useRouter } from "next/navigation";
import { useState } from "react";

interface useCustomizationOptionsReturn {
  addError: string;
  postCustomizationOption: (value?: string) => Promise<boolean>;
  deleteCustomizationOption: (id: string) => Promise<string>;
}

export function useCustomizationOptions(): useCustomizationOptionsReturn {

  const [addError, setAddError] = useState<string>("");

  const router = useRouter();

  async function postCustomizationOption(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/customization-options/post", {
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
            setAddError("Customization option value is required");
            break;
          case 409:
            setAddError("Duplicate value");
            break;
        }
      }
      return false;
    }
  }

  async function deleteCustomizationOption(id: string): Promise<string> {
    if (!id) return "The Id for this customization option was not found.";
    try {
      const response = await fetch(`/api/admin/products/customization-options/delete/${id}`, {
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
    postCustomizationOption,
    deleteCustomizationOption
  }
}
