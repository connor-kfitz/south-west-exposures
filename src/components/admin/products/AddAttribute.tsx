"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { ProductAttribute, ProductAttributeTypes } from "@/types/admin-products";
import { DashboardAlert } from "@/types/admin";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";


interface AttributeCard {
  className?: string;
  type: ProductAttributeTypes;
  data: ProductAttribute[];
  error: string;
  addError: string;
  addAttribute: (value?: string) => Promise<boolean>;
  deleteAttribute: (id: string) => Promise<string>;
  setAlertDialog: React.Dispatch<React.SetStateAction<DashboardAlert>>;
}

export default function AddAttribute({
  className,
  type,
  data,
  error,
  addError,
  addAttribute,
  deleteAttribute,
  setAlertDialog
}: AttributeCard) {

  const [loadingAddAttribute, setLoadingAddAttribute] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  async function addOnClick(): Promise<void> {
    if (loadingAddAttribute) return;
    const value = inputRef?.current?.value;
    setLoadingAddAttribute(true);
    const success = await addAttribute(value);
    if (inputRef.current && success) inputRef.current.value = "";
    setLoadingAddAttribute(false);
  }

  async function deleteOnClick(id: string): Promise<void> {
    if (!id) return;
    const errorResponse = await deleteAttribute(id);
    if (errorResponse) setAlertDialog({title: "Error", description: errorResponse, open: true});
  }

  function getHeader(): string {
    switch (type) {
      case "Shields":
        return "Shields";
      case "Volumes":
        return "Volumes (mL)";
      case "Isotopes":
        return "Isotopes";
      case "Accessories":
        return "Accessories";
      case "Usages":
        return "Usages";
      case "Customization Options":
        return "Customization Options";
      default:
        return "";
    }
  }

  function getPlaceholderValue(): string {
    switch (type) {
      case "Shields":
        return "Shield";
      case "Volumes":
        return "Volume";
      case "Isotopes":
        return "Isotope";
      case "Accessories":
        return "Accessory";
      case "Usages":
        return "Usage";
      default:
        return "";
    }
  }

  return (
    <Card className={cn("p-6", className)}>
      {error ? <div>{error}</div> : (<>
        <CardHeader className="p-0 mb-4 font-bold flex-row justify-between">
          <h2>{getHeader()}</h2>
          <span>{data?.length ?? 0}</span>
        </CardHeader>
        <CardContent className="p-0">
          <AttributeTable type={type} data={data} deleteOnClick={deleteOnClick} />
        </CardContent>
        <CardFooter className="flex-col items-start p-0">
          {addError && <label className="text-xs italic mb-2 ml-1">{addError}</label>}
          <Input className="mb-4" placeholder={`New ${getPlaceholderValue()}`} ref={inputRef} />
          <Button className="w-full" onClick={addOnClick}>
            {loadingAddAttribute ? <LoadingSpinner/> : "Add"}
          </Button>
        </CardFooter>
      </>)}
    </Card>
  )
}

interface AttributeTableProps {
  type: ProductAttributeTypes;
  data: ProductAttribute[];
  deleteOnClick: (id: string) => Promise<void>;
}

function AttributeTable({ type, data, deleteOnClick }: AttributeTableProps) {
  if (!data.length) return;

  function getHeaderName(): string {
    switch (type) {
      case "Shields":
        return "Name";
      case "Volumes":
        return "Value";
      case "Isotopes":
        return "Name";
      case "Accessories":
        return "Name";
      case "Usages":
        return "Name";
      case "Customization Options":
        return "Name";
      default:
        return "";
    }
  }

  return (
    <Table className="mb-4 w-full">
      <TableHeader>
        <TableRow className="border-border">
          <TableHead>{getHeaderName()}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow className="border-border" key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Button variant="ghost" className="block ml-auto px-2" onClick={() => deleteOnClick(item.id)}>
                <Image
                  src="/images/admin/products/delete.svg"
                  alt="delete"
                  width={20}
                  height={20}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
