import { ProductAttribute } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useIsotopesReturn {
  isotopes: ProductAttribute[];
  loading: boolean;
  error: string;
  addError: string;
  postIsotope: (value?: string) => Promise<boolean>;
  deleteIsotope: (id: string) => Promise<string>;
}

export function useIsotopes(): useIsotopesReturn {
  const [isotopes, setIsotopes] = useState<ProductAttribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchIsotopes();
  }, []);

  async function fetchIsotopes(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/getIsotopes");
      if (!response.ok) throw new Error(`${response.status}`);
      const isotopes = await response.json();
      setIsotopes(isotopes);
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

  async function postIsotope(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/postIsotope", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchIsotopes();
      setAddError("");
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
      const response = await fetch(`/api/admin/products/deleteIsotope/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }
      await fetchIsotopes();
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
    isotopes,
    loading,
    error,
    addError,
    postIsotope,
    deleteIsotope
  }
}
