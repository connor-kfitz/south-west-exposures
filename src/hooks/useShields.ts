import { ProductAttribute } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useShieldsReturn {
  shields: ProductAttribute[];
  loading: boolean;
  error: string;
  addError: string;
  postShield: (name?: string) => Promise<boolean>;
  deleteShield: (id: string) => Promise<string>;
}

export function useShields(): useShieldsReturn {
  const [shields, setShields] = useState<ProductAttribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchShields();
  },[]);

  async function fetchShields(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/shields/get");
      if (!response.ok) throw new Error(`${response.status}`);
      const shields = await response.json();
      setShields(shields);
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

  async function postShield(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/shields/post", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchShields();
      setAddError("");
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
      await fetchShields();
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
    shields,
    loading,
    error,
    addError,
    postShield,
    deleteShield
  }
}
