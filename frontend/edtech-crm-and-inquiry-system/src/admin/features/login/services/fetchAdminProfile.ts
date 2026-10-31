import { axiosInstance } from "../../../../lib/axiosInstance";
import type { Admin } from "../../types/adminPayload";

type AdminProfileResponse = {
  data: Admin;
};

export default async function fetchAdminProfile(): Promise<Admin> {
  const { data } = await axiosInstance.get<AdminProfileResponse>("/admin/profile", {
    withCredentials: true,
  });
  return data.data;
}