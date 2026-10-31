import type { Request, Response, NextFunction } from "express";
import { db } from "../prisma/db";
import AppError from "../middlewares/appError";
import { comparePassword } from "../utils/comparePassword";
import { generateaccessToken } from "../utils/generateaccessToken";
import env from "../config/env";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    console.log(email)

    const isAdmin = await db.orm.public.User.where({ email: email }).first();
    if (!isAdmin) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordRight = await comparePassword(
      password,
      isAdmin?.passwordHash,
    );

    if (!isPasswordRight) {
      return next(new AppError("Password doesn't exist", 401));
    }

    const token = await generateaccessToken(isAdmin.id, isAdmin.role);

    res.cookie("accessToken", token, {
      httpOnly: false,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        id: isAdmin.id,
        name: isAdmin.name,
        email: isAdmin.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getProfileDetails = async(req:Request , res:Response ,next:NextFunction) => {
    try {
        const admin = req.admin
        console.log(admin)
        return res.status(200).json({
            success: true,
            message:"successfully fetched user details",
            data: admin
        })
        
    } catch (error) {
        return next(error)
    }
}
