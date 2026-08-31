"use client";

import { Button } from "@coss/ui/components/button";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@coss/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coss/ui/components/table";
import { cn } from "@coss/ui/lib/utils";
import {
  type Column,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react";
import * as React from "react";

const DataTableContext = React.createContext<TanStackTable<unknown> | null>(
  null,
);

function useDataTable<TData>(): TanStackTable<TData> {
  const table = React.useContext(DataTableContext);
  if (!table) {
    throw new Error("DataTable parts must be used within a <DataTable />");
  }
  return table as TanStackTable<TData>;
}

interface DataTableProps<TData>
  extends Omit<React.ComponentProps<"div">, "children"> {
  columns: ColumnDef<TData>[];
  data: TData[];
  initialSorting?: SortingState;
  pageSize?: number;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  children: React.ReactNode;
}

function DataTable<TData>({
  columns,
  data,
  initialSorting = [],
  pageSize = 10,
  enableRowSelection,
  rowSelection: rowSelectionProp,
  onRowSelectionChange,
  className,
  children,
  ...props
}: DataTableProps<TData>): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [internalSelection, setInternalSelection] =
    React.useState<RowSelectionState>({});

  const currentSelection = rowSelectionProp ?? internalSelection;

  const handleRowSelectionChange = React.useCallback(
    (
      updater:
        | RowSelectionState
        | ((old: RowSelectionState) => RowSelectionState),
    ) => {
      const nextSelection =
        typeof updater === "function" ? updater(currentSelection) : updater;
      if (rowSelectionProp === undefined) {
        setInternalSelection(nextSelection);
      }
      onRowSelectionChange?.(nextSelection);
    },
    [currentSelection, rowSelectionProp, onRowSelectionChange],
  );

  const table = useReactTable({
    columns,
    data,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize } },
    state: { sorting, rowSelection: currentSelection },
  });

  return (
    <DataTableContext.Provider value={table as TanStackTable<unknown>}>
      <div
        className={cn("flex flex-col gap-4", className)}
        data-slot="data-table"
        {...props}
      >
        {children}
      </div>
    </DataTableContext.Provider>
  );
}

function DataTableContent({
  className,
  ...props
}: React.ComponentProps<"table">): React.ReactElement {
  const table = useDataTable<unknown>();

  return (
    <Table className={className} {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              data-state={row.getIsSelected() && "selected"}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              className="h-24 text-center"
              colSpan={table.getAllColumns().length}
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function DataTableColumnHeader<TData>({
  column,
  title,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  column: Column<TData, unknown>;
  title: React.ReactNode;
}): React.ReactElement {
  const sorted = column.getIsSorted();

  return (
    <button
      className={cn(
        "-ms-1 flex cursor-pointer items-center gap-1.5 rounded-md px-1 py-0.5 font-medium outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className,
      )}
      data-slot="data-table-column-header"
      onClick={() => column.toggleSorting(sorted === "asc")}
      type="button"
      {...props}
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUpIcon aria-hidden="true" className="size-3.5 opacity-80" />
      ) : sorted === "desc" ? (
        <ArrowDownIcon aria-hidden="true" className="size-3.5 opacity-80" />
      ) : (
        <ChevronsUpDownIcon
          aria-hidden="true"
          className="size-3.5 opacity-50"
        />
      )}
    </button>
  );
}

const dataTablePageSizeOptions = [10, 20, 30, 40, 50];

function DataTablePagination({
  className,
  pageSizeOptions = dataTablePageSizeOptions,
  ...props
}: React.ComponentProps<"div"> & {
  pageSizeOptions?: number[];
}): React.ReactElement {
  const table = useDataTable<unknown>();

  return (
    <div
      className={cn(
        "flex flex-col-reverse items-center gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      data-slot="data-table-pagination"
      {...props}
    >
      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap text-base text-muted-foreground sm:text-sm">
          Rows per page
        </p>
        <Select
          items={pageSizeOptions.map((count) => ({
            label: String(count),
            value: count,
          }))}
          onValueChange={(value) => table.setPageSize(value as number)}
          value={table.getState().pagination.pageSize}
        >
          <SelectTrigger className="w-16" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {pageSizeOptions.map((count) => (
              <SelectItem key={count} value={count}>
                {count}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
      <div className="flex items-center gap-6 lg:gap-8">
        <p className="whitespace-nowrap text-base text-muted-foreground sm:text-sm">
          {table.getFilteredSelectedRowModel().rows.length > 0 &&
            `${table.getFilteredSelectedRowModel().rows.length} of `}
          {table.getFilteredRowModel().rows.length} row(s)
        </p>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Go to previous page"
            disabled={!table.getCanPreviousPage()}
            onClick={table.previousPage}
            size="icon-sm"
            variant="outline"
          >
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            disabled={!table.getCanNextPage()}
            onClick={table.nextPage}
            size="icon-sm"
            variant="outline"
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableContent,
  DataTablePagination,
};
