import { z } from "zod";
import { USER_TYPE_OPTIONS } from "../constants/userTypeOptions";
import { INQUIRY_CATEGORY_OPTIONS } from "../constants/inquiryCategoryOptions";

export const inquirySchema = z.object({
  userType: z.enum(
    USER_TYPE_OPTIONS.map((option) => option.value) as [
      (typeof USER_TYPE_OPTIONS)[number]["value"],
      ...(typeof USER_TYPE_OPTIONS)[number]["value"][],
    ],
  ),

  category: z.enum(
    INQUIRY_CATEGORY_OPTIONS.map((option) => option.value) as [
      (typeof INQUIRY_CATEGORY_OPTIONS)[number]["value"],
      ...(typeof INQUIRY_CATEGORY_OPTIONS)[number]["value"][],
    ],
  ),

  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(
      /^\+?[0-9\s()-]{7,20}$/,
      "Please enter a valid phone number.",
    )
    .refine(
      (value) => (value.match(/\d/g) ?? []).length >= 7,
      "Phone number must contain at least 7 digits.",
    ),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
});