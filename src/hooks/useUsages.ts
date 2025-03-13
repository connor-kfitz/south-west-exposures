import { Usage } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useUsagesReturn {
  usages: Usage[];
  loading: boolean;
  error: string;
  addError: string;
  postUsage: (name?: string) => Promise<boolean>;
  deleteUsage: (id: string) => Promise<boolean>;
}

export function useUsages(): useUsagesReturn {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchUsages();
  }, []);

  async function fetchUsages(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/getUsages");
      if (!response.ok) throw new Error(`${response.status}`);
      const usages = await response.json();
      setUsages(usages);
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

  async function postUsage(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/postUsage", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchUsages();
      setAddError("");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        switch (statusCode) {
          case 400:
            setAddError("Usage name is required");
            break;
          case 409:
            setAddError("Duplicate name");
            break;
        }
      }
      return false;
    }
  }

  async function deleteUsage(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const response = await fetch(`/api/admin/products/deleteUsage/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchUsages();
      return true;
    } catch {
      return false;
    }
  }

  return {
    usages,
    loading,
    error,
    addError,
    postUsage,
    deleteUsage
  }
}
