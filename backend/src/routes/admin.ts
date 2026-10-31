import  Express  from "express";
import asyncCatchError from "../middlewares/asyncCatchError.js";
import { getProfileDetails, login } from "../controllers/admin.js";
import { isAdminAuthenticated } from "../middlewares/authorization/admin.js";

export const adminRouter =Express.Router()

adminRouter.post("/login", asyncCatchError(login))
adminRouter.get("/profile", isAdminAuthenticated, asyncCatchError(getProfileDetails))