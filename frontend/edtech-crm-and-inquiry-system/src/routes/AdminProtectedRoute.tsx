import fetchAdminProfile from '@/admin/features/login/services/fetchAdminProfile';
import { clearAdmin, setAdmin } from '@/admin/features/login/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { admin, isAuthenticated } = useAppSelector((state) => state.adminAuth);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const admin = await fetchAdminProfile();
        dispatch(setAdmin(admin));
      } catch (error) {
        dispatch(clearAdmin());
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm uppercase tracking-[0.28em] text-onsurface/60">
          Loading
        </p>
      </main>
    );
  }

  if (!isAuthenticated || !admin) {
    const returnTo = location.pathname + location.search;
    return (
      <Navigate
        to={`/admin/login?returnTo=${encodeURIComponent(returnTo)}`}
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute