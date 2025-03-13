"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { AttributeInput, AttributeTypes } from "@/types/admin-products";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface AttributeCard {
  className?: string;
  type: AttributeTypes;
  data: AttributeInput[];
  error: string;
  addError: string;
  addAttribute: (value?: string) => Promise<boolean>;
  deleteAttribute: (id: string) => Promise<boolean>;
}

export default function AddAttribute({
  className,
  type,
  data,
  error,
  addError,
  addAttribute,
  deleteAttribute
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
    await deleteAttribute(id);
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
    <Card className={cn("p-6 w-1/6", className)}>
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
          <Button className="w-full cursor-pointer" onClick={addOnClick}>
            {loadingAddAttribute ? <LoadingSpinner /> : "Add"}
          </Button>
        </CardFooter>
      </>)}
    </Card>
  )
}

interface AttributeTableProps {
  type: AttributeTypes;
  data: AttributeInput[];
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
      default:
        return "";
    }
  }

  function getKey(item: AttributeInput): string {
    if ("name" in item) {
      return item.name;
    } else if ("value" in item) {
      return item.value;
    } else {
      return "";
    }
  }

  return (
    <Table className="mb-4">
      <TableHeader>
        <TableRow>
          <TableHead>{getHeaderName()}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{getKey(item)}</TableCell>
            <TableCell>
              <Button variant="ghost" className="block ml-auto px-2 cursor-pointer" onClick={() => deleteOnClick(item.id)}>
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
