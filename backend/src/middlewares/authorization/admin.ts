import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import AppError from "../appError.js";
import env from "../../config/env.js";
import { db } from "../../prisma/db.js";
import type { AuthPayload } from "../../types/index.js";


export const isAdminAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next(new AppError("Please login again", 401));
    }
    const decodedObj = jwt.verify(accessToken, `${env.JWT_SECRET}`) as AuthPayload
    if (!decodedObj || typeof decodedObj === "string") {
      return next(new AppError("Please login again", 401));
    }

    const { id, role } = decodedObj;

    if (role !== "ADMIN") {
      return next(
        new AppError("Access denied. Admin privileges required.", 403)
      );
    }

    if (!id) {
      return next(new AppError("Please login again", 401));
    }

const admin = await db.orm.public.User
  .where({ id: id })
  .select("id", "name", "email")
  .first();

    if(!admin) {
        return next(new AppError("User not found", 401))
    }

    req.admin =  admin;
    return next()
  } catch (error) {
    return next(error)
  }
};