"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableContent,
  DataTablePagination,
} from "@/registry/default/ui/data-table";
import { Label } from "@/registry/default/ui/label";

type Member = {
  id: string;
  name: string;
  role: "Owner" | "Admin" | "Member";
};

const data: Member[] = [
  { id: "m5gr84i9", name: "Ken99", role: "Owner" },
  { id: "3u1reuv4", name: "Abe45", role: "Admin" },
  { id: "derv1ws0", name: "Monserrat44", role: "Member" },
  { id: "5kma53ae", name: "Silas22", role: "Member" },
  { id: "bhqecj4p", name: "Carmella", role: "Member" },
];

const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(Boolean(checked))
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(Boolean(checked))}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <Label>{row.original.name}</Label>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
  },
];

export default function Particle() {
  return (
    <DataTable
      className="w-full max-w-xl"
      columns={columns}
      data={data}
      enableRowSelection
      pageSize={5}
    >
      <DataTableContent className="rounded-lg border" />
      <DataTablePagination />
    </DataTable>
  );
}
