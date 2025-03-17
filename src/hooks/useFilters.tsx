import { Filter } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useFiltersReturn {
  filters: Filter[];
  loading: boolean;
  error: string;
}

export function useFilters(): useFiltersReturn {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchFilters();
  }, []);

  async function fetchFilters(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/getFilters");
      if (!response.ok) throw new Error(`${response.status}`);
      const filters = await response.json();
      setFilters(filters);
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

  return {
    filters,
    loading,
    error
  }
}
