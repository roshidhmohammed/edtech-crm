import { Separator } from "@base-ui/react";
import { Activity, GraduationCap, LayoutDashboard } from "lucide-react";

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="size-5" />
        </div>

        <div>
          <p className="font-bold tracking-tight">EduConnect</p>
          <p className="text-xs text-muted-foreground">Administration</p>
        </div>
      </div>

      <Separator />

      <div className="px-4 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <nav className="space-y-1">
          <button
            type="button"
            onClick={onNavigate}
            className="flex w-full items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </button>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            <span className="text-sm font-medium">Inquiry Management</span>
          </div>

          <p className="text-xs leading-5 text-muted-foreground">
            Manage submitted inquiries and review their details.
          </p>
        </div>
      </div>
    </div>
  );
}
