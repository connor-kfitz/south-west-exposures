"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Product, ProductPreview } from "@/types/admin-products"
import { cn } from "@/lib/utils"

interface ComboboxProps {
  products: (Product | ProductPreview)[];
  productsDnD: ProductPreview[];
  setProductsDnD?: React.Dispatch<React.SetStateAction<ProductPreview[]>>;
  className?: string;
}

export function Combobox({ products, productsDnD, setProductsDnD, className }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  function addProduct(product: Product | ProductPreview) {
    if (productsDnD.some(productDnD => productDnD.id === product.id)) return;
    setProductsDnD?.(prev => {
      const index = prev.findIndex(p => p.name === "Blank");
      if (index === -1) return prev;
      
      const updated = [...prev];
      updated[index] = product;
      return updated;
    });
    setOpen(false)
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${className}`}
          disabled={!productsDnD.some(product => product.name === "Blank")}
        >
          Select Product...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9"/>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {products.map((product, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    addProduct(product)
                  }}
                >
                  {product.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      productsDnD.some(p => p.id === product.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
