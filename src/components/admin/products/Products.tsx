
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProductsTable } from "./ProductsTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Product } from "@/types/admin-products"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "shield",
    header: "Shields"
  },
  {
    accessorKey: "volumes",
    header: "Volumes"
  },
  {
    accessorKey: "isotopes",
    header: "Isotopes"
  },
];

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {

  return (
    <Card className="p-6 mb-6">
      <CardHeader className="p-0 mb-6 font-bold flex-row justify-between">
        <h2>Products</h2>
      </CardHeader>
      <CardContent className="p-0">
        <ProductsTable columns={columns} data={products}/>
      </CardContent>
    </Card>
  )
}
