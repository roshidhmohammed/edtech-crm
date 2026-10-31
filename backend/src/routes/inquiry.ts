import  Express  from "express";
import asyncCatchError from "../middlewares/asyncCatchError.js";
import { allInquiries, inquiryCounts, submit } from "../controllers/inquiry.js";
import { isAdminAuthenticated } from "../middlewares/authorization/admin.js";

export const inquiryRouter =Express.Router()

inquiryRouter.post("/submit", asyncCatchError(submit))
inquiryRouter.get("/stats", isAdminAuthenticated, asyncCatchError(inquiryCounts))
inquiryRouter.get("/", isAdminAuthenticated, asyncCatchError(allInquiries))