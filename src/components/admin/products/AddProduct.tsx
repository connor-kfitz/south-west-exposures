"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NewProductForm from "./NewProductForm";
import { Filter, Product, ProductAttribute } from "@/types/admin-products";

interface AddProductProps {
  className?: string;
  shields: ProductAttribute[];
  volumes: ProductAttribute[];
  isotopes: ProductAttribute[];
  accessories: ProductAttribute[];
  usages: ProductAttribute[];
  products: Product[];
  filters: Filter[];
}

export default function AddProduct({ className, shields, volumes, isotopes, accessories, usages, products, filters }: AddProductProps) {

  return (
    <Card className={cn("p-6", className)}>
      <CardHeader className="p-0 mb-6 font-bold flex-row justify-between">
        <h2>New Product</h2>
      </CardHeader>
      <CardContent className="p-0">
        <NewProductForm 
          isotopeOptions={isotopes}
          usageOptions={usages}
          shieldOptions={shields}
          accessoryOptions={accessories}
          volumeOptions={volumes}
          productOptions={products}
          filters={filters}
        />
      </CardContent>
    </Card>
  )
}
