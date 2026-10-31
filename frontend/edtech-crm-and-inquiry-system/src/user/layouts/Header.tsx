import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-6 md:h-20 md:px-9">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-6" />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight">
              EduConnect
            </span>
            <span className="text-xs text-muted-foreground">
              Learn. Grow. Succeed.
            </span>
          </div>
        </Link>

        {/* Admin - Right */}
        <Button>
          <Link to="/admin/login">Admin</Link>
        </Button>
      </div>
    </header>
  );
}
