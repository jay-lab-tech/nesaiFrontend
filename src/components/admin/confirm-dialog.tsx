"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  loading?: boolean;
  variant?: "danger" | "warning";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Konfirmasi Hapus",
  description = "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
  confirmText = "Hapus",
  cancelText = "Batal",
  onConfirm,
  loading = false,
  variant = "danger",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-full"
              style={{
                background:
                  variant === "danger"
                    ? "var(--admin-danger-bg)"
                    : "var(--admin-warning-bg)",
              }}
            >
              <AlertTriangle
                size={20}
                style={{
                  color:
                    variant === "danger"
                      ? "var(--admin-danger)"
                      : "var(--admin-warning)",
                }}
              />
            </div>
            <DialogTitle className="text-[var(--admin-fg)]">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-[var(--admin-fg-muted)] mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="border-[var(--admin-border)] text-[var(--admin-fg)] hover:bg-[var(--admin-bg-secondary)]"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={
              variant === "danger"
                ? "bg-[var(--admin-danger)] hover:bg-red-700 text-white"
                : "bg-[var(--admin-warning)] hover:bg-amber-700 text-white"
            }
          >
            {loading ? "Menghapus..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
