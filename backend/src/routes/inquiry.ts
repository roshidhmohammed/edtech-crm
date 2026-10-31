import  Express  from "express";
import asyncCatchError from "../middlewares/asyncCatchError";
import { allInquiries, inquiryCounts, submit } from "../controllers/inquiry";
import { isAdminAuthenticated } from "../middlewares/authorization/admin";

export const inquiryRouter =Express.Router()

inquiryRouter.post("/submit", asyncCatchError(submit))
inquiryRouter.get("/stats", isAdminAuthenticated, asyncCatchError(inquiryCounts))
inquiryRouter.get("/", isAdminAuthenticated, asyncCatchError(allInquiries))