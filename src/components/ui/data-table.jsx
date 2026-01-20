import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react"

export function DataTable({
  columns,
  data,
  currentPage,
  lastPage,
  fromPage,
  toPage,
  totalData,
  onPrev,
  onNext,
}) {

  const [columnVisibility, setColumnVisibility] = React.useState(() => {
    const saved = localStorage.getItem("table-column-visibility")
    return saved ? JSON.parse(saved) : {}
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  React.useEffect(() => {
    localStorage.setItem(
      "table-column-visibility",
      JSON.stringify(columnVisibility)
    )
  }, [columnVisibility])


  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        {/* KIRI: Kolom + Pagination */}
        <div className="flex items-center gap-3">
          {/* Column Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings2 className="w-4 h-4" />
                Kolom
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {table
                .getAllLeafColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {typeof column.columnDef.header === "function"
                      ? column.id
                      : column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* PAGINATION CONTROL */}
          <div className="flex items-center gap-1 text-xs text-slate-700">
            <button
              onClick={onPrev}
              disabled={currentPage === 1}
              className="p-1 rounded-md bg-slate-100 disabled:opacity-40"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            <span className="px-1 font-medium">
              Page {currentPage} / {lastPage}
            </span>

            <button
              onClick={onNext}
              disabled={currentPage === lastPage}
              className="p-1 rounded-md bg-slate-100 disabled:opacity-40"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KANAN: INFO JUMLAH DATA */}
        <div className="text-xs text-slate-500 whitespace-nowrap">
          {fromPage || 0}-{toPage || 0} of {totalData}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* HEADER BARIS 1 */}
            <TableRow>
              {table.getHeaderGroups()[0].headers.map(header => {
                const isGroup = header.column.columns?.length > 0

                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={isGroup ? 1 : 2}
                    className="text-center text-gray-900 align-middle bg-gray-200 border border-gray-300"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>

            {/* HEADER BARIS 2 (KHUSUS ANAK DETAIL KARYA) */}
            {table.getHeaderGroups().length > 1 && (
              <TableRow>
                {table
                  .getHeaderGroups()[1]
                  .headers
                  .filter(header => header.column.parent?.columnDef?.header === "Detail Karya")
                  .map(header => (
                    <TableHead
                      key={header.id}
                      className="text-center text-gray-900 bg-gray-200 border border-gray-300"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
              </TableRow>
            )}

          </TableHeader>


          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="border border-gray-300 px-4 py-3 align-top whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Data kosong
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
