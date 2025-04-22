"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Filter, Product, ProductAttribute } from "@/types/admin-products";
import NewProductForm from "./NewProductForm";

interface AddProductProps {
  className?: string;
  shields: ProductAttribute[];
  volumes: ProductAttribute[];
  isotopes: ProductAttribute[];
  accessories: ProductAttribute[];
  customizationOptions: ProductAttribute[];
  usages: ProductAttribute[];
  products: Product[];
  filters: Filter[];
  editProduct: Product | null;
  fetchProducts: () => Promise<void>;
  setEditProduct: (product: Product | null) => void;
}

export default function AddProduct({
  className,
  shields,
  volumes,
  isotopes,
  accessories,
  customizationOptions,
  usages,
  products,
  filters,
  editProduct,
  fetchProducts,
  setEditProduct 
}: AddProductProps) {

  return (
    <Card className={cn("p-6", className)}>
      <CardHeader className="p-0 mb-6 font-bold flex-row justify-between">
        <h2>{editProduct ? "Edit Product" : "New Product"}</h2>
      </CardHeader>
      <CardContent className="p-0">
        <NewProductForm 
          isotopeOptions={isotopes}
          customizationOptions={customizationOptions}
          usageOptions={usages}
          shieldOptions={shields}
          accessoryOptions={accessories}
          volumeOptions={volumes}
          productOptions={products}
          filters={filters}
          editProduct={editProduct}
          fetchProducts={fetchProducts}
          setEditProduct={setEditProduct}
        />
      </CardContent>
    </Card>
  )
}
