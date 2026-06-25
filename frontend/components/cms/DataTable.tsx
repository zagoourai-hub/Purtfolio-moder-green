"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ColumnConfig<T> {
  header: string;
  accessorKey?: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[] | undefined;
  columns: ColumnConfig<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-md">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-b border-zinc-800 hover:bg-transparent">
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className="h-12 px-4 text-left font-semibold text-zinc-400 text-xs uppercase tracking-wider"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading State (Skeleton)
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-zinc-800/60 hover:bg-transparent"
                >
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex} className="p-4 h-16">
                      <div className="h-4 bg-zinc-800/80 animate-pulse rounded-md w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data || data.length === 0 ? (
              // Empty State
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-zinc-500 font-medium"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              // Data rows
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-4 py-3.5 text-sm text-zinc-300 font-medium whitespace-nowrap"
                    >
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? (item[col.accessorKey as keyof T] as unknown as React.ReactNode)
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
