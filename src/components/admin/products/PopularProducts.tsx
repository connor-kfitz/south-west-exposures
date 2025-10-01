"use client";

import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProductPreview } from "@/types/admin-products";
import { Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Combobox } from "./Combobox";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Image from "next/image";

interface PopularProductsProps {
  products: ProductPreview[];
  popularProducts?: ProductPreview[];
  postPopularProducts: (products: { productId: string; order: number }[]) => Promise<boolean>;
  className?: string;
}

export default function PopularProducts({ products, popularProducts, postPopularProducts, className}: PopularProductsProps) {

  const blankProduct: ProductPreview = useMemo(() => ({
    id: "",
    images: [{ id: "", src: "/images/admin/products/placeholder-product.png" }],
    name: "Blank",
    shields: [],
    volumes: [],
    isotopes: []
  }), []);

  const [productsDnD, setProductsDnD] = useState<ProductPreview[]>([]) 
  const [postProductsLoading, setPostProductsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!popularProducts) return;

    const filled = [...popularProducts];
    while (filled.length < 4) {
      filled.push({ ...blankProduct, id: `blank-${filled.length}` });
    }
    setProductsDnD(filled);
  }, [popularProducts, blankProduct]);
  
  const handleRemove = (id: string) => {
    setProductsDnD?.(prev => {
      const existingIds = new Set(prev.map(p => String(p.id)));
      let i = 0;
      let newId = `blank-${i}`;
      while (existingIds.has(newId)) {
        i++;
        newId = `blank-${i}`;
      }

      return prev.map(product =>
        String(product.id) === id
          ? { ...blankProduct, id: newId }
          : product
      );
    });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = productsDnD.findIndex(item => item.id === active.id);
      const newIndex = productsDnD.findIndex(item => item.id === over?.id);

      setProductsDnD(arrayMove(productsDnD, oldIndex, newIndex));
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor);

  async function updateProducts() {
    setPostProductsLoading(true);
    const filteredProducts = productsDnD.filter(product => product.name !== "Blank");
    await postPopularProducts(
      filteredProducts.map((product, index) => ({
        productId: product.id,
        order: index
      }))
    );
    setPostProductsLoading(false);
  }
  
  return (
    <Card className={cn("p-6", className)}>
      <CardHeader className="p-0 mb-6 font-bold flex-row justify-start">
        <h2 className="mr-auto">Popular Products</h2>
        <Combobox products={products} productsDnD={productsDnD} setProductsDnD={setProductsDnD} className="mr-4"/>
        <Button type="button" className="w-[100px]" onClick={updateProducts}>{postProductsLoading ? <LoadingSpinner/> : "Update"}</Button>
      </CardHeader>
      <CardContent className="p-0">
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={productsDnD.length > 0 ? productsDnD.map((image) => image.id) : []}>
            <ul className="flex gap-4">
              {productsDnD.map((product, index) => 
                <SortableProduct key={index} product={product} removeProduct={handleRemove}/>
              )}
            </ul>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  )
}

interface SortableImageProps {
  product: ProductPreview;
  removeProduct: (id: string) => void;
}

function SortableProduct({ product, removeProduct }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-full relative rounded-md overflow-hidden cursor-grab m-0 lg:m-2">
      {product.name !== "Blank" && 
        <button
          type="button"
          onClick={() => removeProduct(product.id)}
          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full cursor-pointer z-50"
        >
          <Trash className="w-5 h-5" />
        </button>
      }
      <div>
        <div className="relative aspect-[1/1] w-full bg-gray-100 rounded-[8px] overflow-hidden group pointer-events-none">
          <Image 
            src={product.images[0].src || ""}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
          />
        </div>
        <h2 className="py-4 px-2 text-center">{product.name === "Blank" ? "" : product.name}</h2>
      </div>
    </li>
  )
}
