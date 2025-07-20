import { ProductPreview } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface usePopularProductsReturn {
  popularProducts: ProductPreview[];
  loading: boolean;
  error: string;
  postPopularProducts: (products: { productId: string; order: number }[]) => Promise<boolean>;
}

export function usePopularProducts(): usePopularProductsReturn {
  const [popularProducts, setPopularProducts] = useState<ProductPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  async function fetchPopularProducts(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/popular/get");
      if (!response.ok) throw new Error(`${response.status}`);
      const products = await response.json();
      setPopularProducts(products);
      setError("");
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

  async function postPopularProducts(products: { productId: string; order: number }[]): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/popular/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || response.status.toString());
      }
      await fetchPopularProducts();
      setError("");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
    return false;
  }

  return {
    popularProducts,
    loading,
    error,
    postPopularProducts,
  }
}
