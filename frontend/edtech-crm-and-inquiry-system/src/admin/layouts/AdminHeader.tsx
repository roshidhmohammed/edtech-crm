import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminSidebar } from "./AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAdmin } from "@/admin/features/login/slices/authSlice";

// import AdminSidebar from "./AdminSidebar";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({
  title = "Dashboard",
  subtitle = "Manage your inquiries",
}: AdminHeaderProps) {
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.adminAuth.admin);

  const handleLogout = () => {
    document.cookie = "accessToken=; Max-Age=0; path=/";
    dispatch(clearAdmin());
    window.location.assign("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger >
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">
              Admin navigation
            </SheetTitle>

            <AdminSidebar />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-sm font-semibold">{title}</h1>

          <p className="hidden text-xs text-muted-foreground sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">Administrator</p>
          <p className="text-xs text-muted-foreground">
            {admin?.email ?? ""}
          </p>
        </div>

        <div
          className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
          aria-label="Administrator avatar"
        >
          A
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Log out"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}