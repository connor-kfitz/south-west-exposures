import { useState } from "react";
import { useRouter } from "next/navigation";

interface usePopularProductsReturn {
  error: string;
  postPopularProducts: (products: { productId: string; order: number }[]) => Promise<boolean>;
}

export function usePopularProducts(): usePopularProductsReturn {
  const [error, setError] = useState<string>("");

  const router = useRouter();

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
      setError("");
      router.refresh();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      return false;
    }
  }

  return {
    error,
    postPopularProducts,
  }
}
