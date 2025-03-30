
"use client"

import { ProductsTable } from "./ProductsTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Product } from "@/types/admin-products"
import { useState } from "react";
import SearchInput from "./SearchInput";

interface ProductsProps {
  products: Product[];
  setEditProduct: (product: Product | null) => void;
  deleteProduct: (id: string) => Promise<boolean>;
}

export default function Products({ products, setEditProduct, deleteProduct }: ProductsProps) {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.shields.some(shield => shield.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    product.volumes.some(volume => volume.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    product.isotopes.some(isotope => isotope.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="p-6 mb-6">
      <CardHeader className="p-0 mb-6 font-bold flex-row justify-between">
        <h2>Products</h2>
      </CardHeader>
      <CardContent className="p-0">
        {products.length ? 
          <>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ProductsTable 
              data={filteredData}
              setEditProduct={setEditProduct}
              deleteProduct={deleteProduct}
            />
          </> 
          : 
          <div>No Products Available</div>
        }
      </CardContent>
    </Card>
  )
}
