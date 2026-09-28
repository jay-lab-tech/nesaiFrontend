"use client";

import { useState, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  searchValue?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  actions?: (item: T) => ReactNode;
  filters?: ReactNode;
  loading?: boolean;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  getRowId?: (item: T) => string | number;
}

// ── Component ──────────────────────────────────────────────

export function DataTable<T = any>({
  columns,
  data,
  searchPlaceholder = "Cari data...",
  onSearch,
  searchValue = "",
  onEdit,
  onDelete,
  actions,
  filters,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  total,
  onPageChange,
  emptyMessage = "Belum ada data.",
  getRowId,
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearch?.(value);
  };

  const hasActions = onEdit || onDelete || actions;

  return (
    <div className="admin-card p-0 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-[var(--admin-border)]">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-fg-subtle)]"
          />
          <Input
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9 bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-subtle)] h-9"
          />
        </div>

        {/* Filters */}
        {filters && <div className="flex items-center gap-2">{filters}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.className || ""}>
                  {col.label}
                </th>
              ))}
              {hasActions && (
                <th className="text-right w-[100px]">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      <div className="admin-skeleton h-4 w-3/4 rounded" />
                    </td>
                  ))}
                  {hasActions && (
                    <td>
                      <div className="admin-skeleton h-4 w-16 rounded ml-auto" />
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-center py-12 text-[var(--admin-fg-muted)]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, idx) => {
                const rowId = getRowId
                  ? getRowId(item)
                  : (item as any)?.id
                  ? String((item as any).id)
                  : idx;

                return (
                  <tr key={rowId}>
                    {columns.map((col) => (
                      <td key={col.key} className={col.className || ""}>
                        {col.render
                          ? col.render(item)
                          : String((item as any)?.[col.key] ?? "—")}
                      </td>
                    ))}
                    {hasActions && (
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          {actions ? (
                            actions(item)
                          ) : (
                            <>
                              {onEdit && (
                                <button
                                  onClick={() => onEdit(item)}
                                  className="p-1.5 rounded-md hover:bg-[var(--admin-bg-secondary)] text-[var(--admin-fg-muted)] hover:text-[var(--admin-primary)] transition-colors"
                                  title="Edit"
                                >
                                  <Pencil size={15} />
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  onClick={() => onDelete(item)}
                                  className="p-1.5 rounded-md hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-muted)] hover:text-[var(--admin-danger)] transition-colors"
                                  title="Hapus"
                                >
                                  <Trash2 size={15} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-fg-muted)]">
            {total !== undefined
              ? `Menampilkan halaman ${currentPage} dari ${totalPages} (${total} data)`
              : `Halaman ${currentPage} dari ${totalPages}`}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--admin-border)]"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage <= 1}
            >
              <ChevronsLeft size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--admin-border)]"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft size={14} />
            </Button>
            <span className="px-3 text-sm font-medium text-[var(--admin-fg)]">
              {currentPage}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--admin-border)]"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--admin-border)]"
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage >= totalPages}
            >
              <ChevronsRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
