import { Route, Routes } from "react-router-dom";
import Inquiry from "../pages/Inquiry";
import UserLayout from "../user/layouts/UserLayout";
import AdminLayout from "../admin/layouts/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import AdminProtectedRoute from "./AdminProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Inquiry />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
