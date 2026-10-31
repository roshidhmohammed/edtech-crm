import AdminHeader from '@/admin/layouts/AdminHeader';
import { AdminSidebar } from '@/admin/layouts/AdminSidebar';
import { Outlet } from 'react-router-dom'





export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50/70">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r lg:block">
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <div className="min-h-screen lg:pl-64">
        <AdminHeader />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


