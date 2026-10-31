import type { ToastProps } from "@/types";
import axios from "axios";
import { toast } from "sonner";

export const AppToast = {
  success({ title, description, duration = 5000 }: ToastProps) {
    toast.success(title, {
      description,
      duration,
    });
  },

  error(error: unknown, fallbackTitle = "Something went wrong") {
    const description = axios.isAxiosError(error)
      ? error.response?.data?.message ||
        error.message ||
        "Something went wrong, Please try again."
      : error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
    toast.error(fallbackTitle, {
      description,
      duration: 5000,
    });
  },

  warning({ title, description, duration = 5000 }: ToastProps) {
    toast.warning(title, {
      description,
      duration,
    });
  },

  info({ title, description, duration = 5000 }: ToastProps) {
    toast.info(title, {
      description,
      duration,
    });
  },

  loading(title: string) {
    return toast.loading(title);
  },

  dismiss(id?: string) {
    toast.dismiss(id);
  },

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },
};