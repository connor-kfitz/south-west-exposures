import { Product } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useProductsReturn {
  products: Product[];
  loading: boolean;
  error: string;
  addError: string;
  postProduct: (value?: string) => Promise<boolean>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<boolean>;
}

export function useProducts(): useProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/getProducts");
      if (!response.ok) throw new Error(`${response.status}`);
      const products = await response.json();
      setProducts(products);
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

  async function postProduct(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/postProduct", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchProducts();
      setAddError("");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        switch (statusCode) {
          case 400:
            setAddError("Product value is required");
            break;
          case 409:
            setAddError("Duplicate value");
            break;
        }
      }
      return false;
    }
  }

  async function deleteProduct(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const response = await fetch(`/api/admin/products/deleteProduct/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchProducts();
      return true;
    } catch {
      return false;
    }
  }

  return {
    products,
    loading,
    error,
    addError,
    postProduct,
    fetchProducts,
    deleteProduct
  }
}
