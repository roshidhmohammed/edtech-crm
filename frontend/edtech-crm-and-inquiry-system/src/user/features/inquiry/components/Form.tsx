import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inquirySchema } from "../schemas/inquirySchema";
import type { InquiryFormValues } from "../types";
import { USER_TYPE_OPTIONS } from "../constants/userTypeOptions";
import { INQUIRY_CATEGORY_OPTIONS } from "../constants/inquiryCategoryOptions";
import { FieldError } from "./FieldError";
import { handleForm } from "../services/handleForm";
import { AppToast } from "../../../../lib/toast";

// 3. Inquiry form
export default function Form() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      userType: undefined,
      category: undefined,
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: InquiryFormValues) {
    setSubmitted(false);

    try {
        // console.log("Inquiry submitted:", values);
        const response = await handleForm(values)
        console.log(response)
      // Replace this with your backend API request.

      // Example:
      // await api.post("/api/user/inquiries", values);

      setSubmitted(true);
       AppToast.success({ title: response.message });
      reset();
    } catch (error) {
         AppToast.error(error, "Failed to submit form");
      console.error("Failed to submit inquiry:", error);
    }
  }

  return (
    <section className="min-h-screen bg-muted/30 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Submit an Inquiry
          </h1>

          <p className="mt-3 text-muted-foreground">
            Have a question? Fill out the form below and let us know how we can
            help.
          </p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Inquiry Form</CardTitle>
            <CardDescription>
              Please provide your details and inquiry information. Fields marked
              with * are required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted && (
              <div
                className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                role="status"
              >
                <CheckCircle2 className="size-5 shrink-0" />
                Your form passed validation. Connect your backend to save the
                inquiry.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Inquiry Details */}
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold">Inquiry Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tell us who you are and what you need help with.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* User Type */}
                  <div className="space-y-2">
                    <Label htmlFor="userType">
                      User Type <span className="text-destructive">*</span>
                    </Label>

                    <Controller
                      name="userType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="userType"
                            aria-invalid={!!errors.userType}
                            aria-describedby={
                              errors.userType ? "userType-error" : undefined
                            }
                            className="w-full"
                          >
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>

                          <SelectContent>
                            {USER_TYPE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    <div id="userType-error">
                      <FieldError message={errors.userType?.message} />
                    </div>
                  </div>

                  {/* Inquiry Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>

                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
                            aria-invalid={!!errors.category}
                            aria-describedby={
                              errors.category ? "category-error" : undefined
                            }
                            className="w-full"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>

                          <SelectContent>
                            {INQUIRY_CATEGORY_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    <div id="category-error">
                      <FieldError message={errors.category?.message} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="mt-8 space-y-5 border-t pt-8">
                <div>
                  <h2 className="text-lg font-semibold">Personal Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Provide your contact information.
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>

                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />

                  <div id="name-error">
                    <FieldError message={errors.name?.message} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      {...register("email")}
                    />

                    <div id="email-error">
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>

                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      {...register("phone")}
                    />

                    <div id="phone-error">
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-8 space-y-5 border-t pt-8">
                <div>
                  <h2 className="text-lg font-semibold">Your Message</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Describe your question or concern in detail.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>

                  <Textarea
                    id="message"
                    placeholder="Write your inquiry here..."
                    rows={5}
                    maxLength={2000}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                  />

                  <div id="message-error">
                    <FieldError message={errors.message?.message} />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Maximum 2000 characters.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 border-t pt-6">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 size-4" />
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>

                <p className="mt-3 text-xs text-muted-foreground">
                  Your information will be used to respond to your inquiry.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
