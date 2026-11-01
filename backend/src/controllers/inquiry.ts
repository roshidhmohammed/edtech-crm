import type { Request, Response, NextFunction } from "express";
import { db } from "../prisma/db.js";
import AppError from "../middlewares/appError.js";

const CATEGORIES = [
  "scholarship",
  "concert",
  "admission",
  "general_query",
] as const;

const USER_TYPES = ["parent", "student", "school"] as const;

export const submit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userType, category, name, email, phone, message } =
      req.body.payload;
    const inquiry = await db.orm.public.Inquiry.create({
      name: name,
      email: email,
      phoneNumber: phone,
      userType: userType,
      category: category,
      message: message,
    });

    return res.json({
      success: true,
      message: "Form submitted",
      data: inquiry,
    });
  } catch (error) {
    return next(error);
  }
};

export const allInquiries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      search = "",
      page = "1",
      category = "",
      userType = "",
      limit = "1",
    } = req.query;

    // Validate pagination
    const pageNo = Number(page);
    const pageLimit = Number(limit);

    if (
      !Number.isInteger(pageNo) ||
      pageNo < 1 ||
      !Number.isInteger(pageLimit) ||
      pageLimit < 1
    ) {
      return next(new AppError("Invalid pagination parameters", 400));
    }

    const take = Math.min(pageLimit, 100);
    const skip = (pageNo - 1) * take;

    const searchValue = typeof search === "string" ? search.trim() : "";

    const categoryValue = typeof category === "string" ? category.trim() : "";

    const userTypeValue = typeof userType === "string" ? userType.trim() : "";

    // Validate filters
    if (
      categoryValue &&
      !CATEGORIES.includes(categoryValue as (typeof CATEGORIES)[number])
    ) {
      return next(new AppError("Invalid inquiry category", 400));
    }

    if (
      userTypeValue &&
      !USER_TYPES.includes(userTypeValue as (typeof USER_TYPES)[number])
    ) {
      return next(new AppError("Invalid user type", 400));
    }

    // Reusable query builder
    const buildQuery = () => {
      let query = db.orm.public.Inquiry;

      // Search by name or phone number
      if (searchValue) {
        const searchTerm = `%${searchValue}%`;

        if (/^\+?[\d\s()-]+$/.test(searchValue)) {
          query = query.where((inquiry) =>
            inquiry.phoneNumber.ilike(searchTerm),
          );
        } else {
          query = query.where((inquiry) => inquiry.name.ilike(searchTerm));
        }
      }

      // Category filter
      if (categoryValue) {
        query = query.where({
          category: categoryValue as (typeof CATEGORIES)[number],
        });
      }

      // User type filter
      if (userTypeValue) {
        query = query.where({
          userType: userTypeValue as (typeof USER_TYPES)[number],
        });
      }

      return query;
    };

    // Fetch inquiries and total count
    const [inquiries, countResult] = await Promise.all([
      buildQuery()
        .select(
          "id",
          "name",
          "phoneNumber",
          "email",
          "userType",
          "category",
          "status",
          "createdAt",
          "message",
        )
        .orderBy((inquiry) => inquiry.createdAt.desc())
        .limit(take)
        .offset(skip)
        .all(),

      buildQuery().aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
    ]);

    const totalRecords = countResult.total;
    const totalPages = Math.ceil(totalRecords / take);

    return res.status(200).json({
      success: true,
      message: "Inquiries fetched successfully",
      data: inquiries,
      pagination: {
        currentPage: pageNo,
        limit: take,
        totalRecords,
        totalPages,
        hasNextPage: pageNo < totalPages,
        hasPreviousPage: pageNo > 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const inquiryCounts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [total, pending, inProgress, resolved] = await Promise.all([
      db.orm.public.Inquiry.aggregate((aggregate) => ({
        count: aggregate.count(),
      })),
      db.orm.public.Inquiry.where({ status: "PENDING" }).aggregate(
        (aggregate) => ({
          count: aggregate.count(),
        }),
      ),
      db.orm.public.Inquiry.where({ status: "IN_PROGRESS" }).aggregate(
        (aggregate) => ({
          count: aggregate.count(),
        }),
      ),
      db.orm.public.Inquiry.where({ status: "RESOLVED" }).aggregate(
        (aggregate) => ({
          count: aggregate.count(),
        }),
      ),
    ]);

    return res.status(200).json({
      success: true,
      message: "Inquiry counts fetched successfully",
      data: {
        totalInquiries: total.count,
        pendingInquiries: pending.count,
        inProgressInquiries: inProgress.count,
        resolvedInquiries: resolved.count,
      },
    });
  } catch (error) {
    return next(error);
  }
};
