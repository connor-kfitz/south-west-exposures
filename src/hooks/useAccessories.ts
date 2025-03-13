import { Accessory } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useAccessoriesReturn {
  accessories: Accessory[];
  loading: boolean;
  error: string;
  addError: string;
  postAccessory: (name?: string) => Promise<boolean>;
  deleteAccessory: (id: string) => Promise<boolean>;
}

export function useAccessories(): useAccessoriesReturn {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchAccessories();
  }, []);

  async function fetchAccessories(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/getAccessories");
      if (!response.ok) throw new Error(`${response.status}`);
      const accessories = await response.json();
      setAccessories(accessories);
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

  async function postAccessory(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/postAccessory", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchAccessories();
      setAddError("");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        switch (statusCode) {
          case 400:
            setAddError("Accessory name is required");
            break;
          case 409:
            setAddError("Duplicate name");
            break;
        }
      }
      return false;
    }
  }

  async function deleteAccessory(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const response = await fetch(`/api/admin/products/deleteAccessory/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchAccessories();
      return true;
    } catch {
      return false;
    }
  }

  return {
    accessories,
    loading,
    error,
    addError,
    postAccessory,
    deleteAccessory
  }
}
