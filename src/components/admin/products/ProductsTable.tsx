"use client"

import { useState } from "react"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, getFilteredRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Product } from "@/types/admin-products"

interface ProductsTableProps<TData> {
  data: TData[];
  setEditProduct: (product: Product | null) => void;
  deleteProduct: (id: string) => Promise<boolean>;
}

export function ProductsTable<TData extends Product>({
  data,
  setEditProduct,
  deleteProduct
}: ProductsTableProps<TData>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 200
    },
    {
      accessorKey: "shields",
      header: "Shields",
      size: 150
    },
    {
      accessorKey: "volumes",
      header: "Volumes",
      size: 150
    },
    {
      accessorKey: "isotopes",
      header: "Isotopes",
      size: 150
    }
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
      setPageIndex(newState.pageIndex)
      setPageSize(newState.pageSize)
    },
    manualPagination: false
  })

  return (
    <div className="rounded-md border border-border p-4">
      <Table className="table-fixed min-w-[500px] md:min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
              <TableHead className="w-[45px]"></TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {Array.isArray(cell.getValue()) ? (
                        <div className="flex flex-wrap gap-1">
                          {(cell.getValue() as { name: string }[]).map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditProduct(row.original)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteProduct(row.original.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {Array.from({ length: pageSize - table.getRowModel().rows.length }).map((_, index) => (
                <TableRow key={`empty-${index}`} className="h-[53px] w-full">
                  {table.getAllColumns().map((column) => (
                    <TableCell key={`empty-cell-${index}-${column.id}`}>&nbsp;</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm ml-2">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div>
          <Button
            variant="outline"
            className="mr-4"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
