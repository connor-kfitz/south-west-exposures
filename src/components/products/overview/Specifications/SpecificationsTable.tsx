"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductSpecification } from "@/types/admin-products";
import { useEffect, useState } from "react";
import { specificationTableBase } from "@/lib/constants";
import HeaderDropdown from "./HeaderDropdown";

interface SpecificationsTableProps {
  specifications: ProductSpecification[];
}

export function SpecificationsTable({ specifications }: SpecificationsTableProps) {
  const [tableData, setTableData] = useState<(string[][][])>([]);
  const [specificationTableColumns, setSpecificationTableColumns] = useState<number[]>([0, 1, 2]);
  
  useEffect(() => {
    if (!specifications.length) return;

    const hasPartNumber = specifications.some(
      (spec) => spec.partNumber?.trim()
    );

    const tableArray: (string[])[][] = [];
    const sortedSpecifications = getSpecificationsByIndices(specifications);

    const baseHeader = [...specificationTableBase];
    if (hasPartNumber) baseHeader.push(["Part Number"]);
    tableArray.push(baseHeader);

    formatSpecifications(sortedSpecifications);
    setTableData(transpose(tableArray));

    function transpose<T>(matrix: T[][]): T[][] {
      if (matrix.length === 0) return [];
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    }

    function getSpecificationsByIndices(specifications: ProductSpecification[]) {
      const updatedSpecifications: ProductSpecification[] = [];
      specificationTableColumns.map((index) => {
        const volume = specifications.find((spec) => spec.volume === specifications.map(item => item.volume).filter(volume => volume !== undefined)[index]);
        if (volume) updatedSpecifications.push(volume);
      });
      return updatedSpecifications;
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
          [String(spec.bottom), String(spec.bottomPbEquiv)]
        ];
        newData.push([spec.partNumber || "-"]);
        tableArray.push(newData);
      });
    }
  }, [specifications, specificationTableColumns]);

  if (!tableData.length) return null;

  return (
    <div className="w-[calc(100vw-24px)] md:w-[664px] overflow-x-scroll sm:overflow-x-auto">
      <div className="inline-block rounded-[8px] border border-gray-300">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-gray-100">
              {tableData[0].map((cell, index) => (
                <TableHead
                  key={index}
                  className={`text-[16px] text-b6 leading-b6 text-black font-medium pt-[15px] pb-[17px] px-[24px] tableBpSm:min-w-[154px]
                    ${index === 0 ? "rounded-tl-[8px] min-w-[176px] tableBpSm:min-w-[200px]" : ""}
                    ${index !== 0 ? "min-w-[100px] pl-2" : ""}
                    ${index === tableData[0].length - 1 ? "rounded-tr-[8px] " : ""}
                    ${index === 2 ? "hidden tableBpSm:table-cell" : ""}
                    ${index === 3 ? "hidden tableBpMd:table-cell" : ""}
                  `}
                >
                  {index === 0
                    ? Array.isArray(cell) ? cell.map((line, i) => <div key={i}>{line}</div>) : cell
                    : <HeaderDropdown
                        volumes={specifications.map(item => item.volume).filter(volume => volume !== undefined)} columnIndex={index - 1}
                        selectedVolumeIndex={specificationTableColumns[index - 1]} setSpecificationTableColumns={setSpecificationTableColumns}
                      />
                  }
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
                      ${colIndex === 2 ? "hidden tableBpSm:table-cell" : ""}
                      ${colIndex === 3 ? "hidden tableBpMd:table-cell" : ""}
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
