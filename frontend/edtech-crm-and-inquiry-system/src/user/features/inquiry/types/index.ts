import { z } from "zod";
import type { inquirySchema } from "../schemas/inquirySchema";

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export interface InquiryData {
  category: "scholarship" | "concert" | "admission" | "general_query";
  email: string;
  message: string;
  name: string;
  phone: string;
  userType: "parent" | "student" | "school";
}
