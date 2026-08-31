# coss Data Table

## When to use

- Sortable, paginated tabular data without hand-rolling TanStack wiring.

## Install

```bash
npx shadcn@latest add @coss/data-table
```

Deps: `@tanstack/react-table`; requires `@coss/button`, `@coss/select`, `@coss/table`.

## Canonical imports

```tsx
import {
  DataTable, DataTableColumnHeader, DataTableContent, DataTablePagination,
} from "@/components/ui/data-table"
```

## Minimal pattern

```tsx
<DataTable columns={columns} data={data}>
  <DataTableContent />
  <DataTablePagination />
</DataTable>
```

## Notes

- `DataTable` owns sorting/pagination state; `initialSorting` and `pageSize` set defaults.
- `DataTableColumnHeader` cycles asc/desc; give it `column` from `header({ column })` in the `ColumnDef`.
- `DataTableContent` passes all `Table` props through, including the `card` variant.
