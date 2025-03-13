"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Shield } from "@/types/admin-products";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface AttributeCard {
  className?: string;
  header: string;
  data: Shield[];
  error: string;
  addError: string;
  addAttribute: (value?: string) => Promise<boolean>;
  deleteAttribute: (id: string) => Promise<boolean>;
}

export default function AddAttribute({ 
  className, 
  header, 
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

  return (
    <Card className={cn("p-6 w-1/6", className)}>
      {error ? <div>{error}</div> : (<>
      <CardHeader className="p-0 mb-4 font-bold flex-row justify-between">
        <h2>{header}</h2>
        <span>{data?.length ?? 0}</span>
      </CardHeader>
      <CardContent className="p-0">
        <AttributeTable data={data} deleteOnClick={deleteOnClick}/>
      </CardContent>
      <CardFooter className="flex-col items-start p-0">
        {addError && <label className="text-xs italic mb-2 ml-1">{addError}</label>}
        <Input className="mb-4" placeholder="New Shield" ref={inputRef}/>
        <Button className="w-full cursor-pointer" onClick={addOnClick}>
          {loadingAddAttribute ? <LoadingSpinner/> : "Add"}
        </Button>
      </CardFooter>
      </>)}
    </Card>
  )
}

interface AttributeTableProps {
  data: Shield[];
  deleteOnClick: (id: string) => Promise<void>;
}

function AttributeTable({ data, deleteOnClick }: AttributeTableProps) {
  if (!data.length) return;
  return (
    <Table className="mb-4">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
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
