import { ProductAttribute } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useCustomizationOptionsReturn {
  customizationOptions: ProductAttribute[];
  loading: boolean;
  error: string;
  addError: string;
  postCustomizationOption: (value?: string) => Promise<boolean>;
  deleteCustomizationOption: (id: string) => Promise<string>;
}

export function useCustomizationOptions(): useCustomizationOptionsReturn {
  const [customizationOptions, setCustomizationOptions] = useState<ProductAttribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchCustomizationOptions();
  }, []);

  async function fetchCustomizationOptions(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/customization-options/get");
      if (!response.ok) throw new Error(`${response.status}`);
      const options = await response.json();
      setCustomizationOptions(options);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  async function postCustomizationOption(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/customization-options/post", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchCustomizationOptions();
      setAddError("");
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
      await fetchCustomizationOptions();
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
    customizationOptions,
    loading,
    error,
    addError,
    postCustomizationOption,
    deleteCustomizationOption
  }
}
