import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  /**
   * Send HttpOnly authentication cookies
   */
  withCredentials: true,
  /**
   * Name of the CSRF cookie
   */
//   xsrfCookieName: "XSRF-TOKEN",
  /**
   * Header Axios sends the CSRF token through
   */
//   xsrfHeaderName: "X-XSRF-TOKEN",
  /**
   * Include XSRF token in requests
   */
//   withXSRFToken: true,
//   headers: {
//     Accept: "application/json",
//   },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Authentication required");
      const currentPath = window.location.pathname + window.location.search;
      const loginUrl = `/admin/login?returnTo=${encodeURIComponent(currentPath)}`;
      window.location.replace(loginUrl);
    }

    return Promise.reject(error);
  },
);