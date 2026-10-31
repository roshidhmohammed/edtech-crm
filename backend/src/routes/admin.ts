import  Express  from "express";
import asyncCatchError from "../middlewares/asyncCatchError";
import { getProfileDetails, login } from "../controllers/admin";
import { isAdminAuthenticated } from "../middlewares/authorization/admin";

export const adminRouter =Express.Router()

adminRouter.post("/login", asyncCatchError(login))
adminRouter.get("/profile", isAdminAuthenticated, asyncCatchError(getProfileDetails))