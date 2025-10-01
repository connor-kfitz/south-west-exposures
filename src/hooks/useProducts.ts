import { useState } from "react";
import { useRouter } from "next/navigation";

interface useProductsReturn {
  addError: string;
  postProduct: (value?: string) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
}

export function useProducts(): useProductsReturn {
  const [addError, setAddError] = useState<string>("");

  const router = useRouter();

  async function postProduct(name?: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/products/post", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      router.refresh();
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
      const response = await fetch(`/api/admin/products/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`${response.status}`);
      router.refresh();
      return true;
    } catch {
      return false;
    }
  }

  return {
    addError,
    postProduct,
    deleteProduct
  }
}
