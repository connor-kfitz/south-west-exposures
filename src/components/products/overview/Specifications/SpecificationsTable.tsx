"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductSpecification } from "@/types/admin-products";
import { useEffect, useState } from "react";
import { specificationTableBase } from "@/lib/constants";

interface SpecificationsTableProps {
  specifications: ProductSpecification[];
}

export function SpecificationsTable({ specifications }: SpecificationsTableProps) {
  const [tableData, setTableData] = useState<(string[][][])>([]);

  useEffect(() => {
    if (!specifications.length) return;

    const tableArray: (string[])[][] = [];
    const sortedSpecifications = sortSpecifications(specifications);

    tableArray.push(specificationTableBase);
    formatSpecifications(sortedSpecifications);
    setTableData(transpose(tableArray));

    function transpose<T>(matrix: T[][]): T[][] {
      if (matrix.length === 0) return [];
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    }

    function sortSpecifications(specifications: ProductSpecification[]) {
      return [...specifications].sort(
        (a, b) => Number(a.volume) - Number(b.volume)
      );
    }

    function formatSpecifications(specifications: ProductSpecification[]) {
      specifications.forEach((spec) => {
        const newData: (string[])[] = [
          [String(spec.volume)],
          [String(spec.weight)],
          [String(spec.height)],
          [String(spec.innerDiameter)],
          [String(spec.outerDiameter)],
          [String(spec.shieldingSide), String(spec.shieldingSidePbEquiv)],
          [String(spec.topShield), String(spec.topShieldPbEquiv)],
          [String(spec.bottom), String(spec.bottomPbEquiv)],
        ];
        tableArray.push(newData);
      });
    }
  }, [specifications]);

  if (!tableData.length) return null;

  return (
    <div className="w-[calc(100vw-24px)] overflow-x-scroll">
      <div className="inline-block rounded-[8px] border border-gray-300">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-gray-100">
              {tableData[0].map((cell, index) => (
                <TableHead
                  key={index}
                  className={`text-[16px] text-b6 leading-b6 text-black font-medium pt-[15px] pb-[17px] px-[24px] tableBpSm:min-w-[154px]
                    ${index === 0 ? "rounded-tl-[8px] min-w-[176px] tableBpSm:min-w-[200px]" : ""}
                    ${index !== 0 ? "min-w-[100px]" : ""}
                    ${index === tableData[0].length - 1 ? "rounded-tr-[8px] " : ""}
                  `}
                >
                  {Array.isArray(cell) ? cell.map((line, i) => <div key={i}>{line}</div>) : cell}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`text-[16px] text-b6 leading-b6 text-black pt-[15px] pb-[17px] px-[24px]
                      ${colIndex === 0 ? "font-medium" : ""}
                      ${colIndex > 0 ? "text-gray-600" : "text-black"}
                      ${rowIndex === tableData.length - 2 && colIndex === 0
                        ? "rounded-bl-[8px]"
                        : ""
                      }
                      ${rowIndex === tableData.length - 2 && colIndex === row.length - 1
                        ? "rounded-br-[8px]"
                        : ""
                      }
                    `}
                  >
                    {Array.isArray(cell)
                      ? cell.map((value, i) => <div key={i}>{value}</div>)
                      : cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
