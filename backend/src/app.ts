import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import { adminRouter } from "./routes/admin.js";
import { inquiryRouter } from "./routes/inquiry.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app: Express = express();
const PORT = 8000;
app.use(cors({
  origin:["http://localhost:5173", "https://edtech-crm-v7w2-nine.vercel.app/"],
   credentials: true
}))

// app.use(helmet());
app.use(express.json());
app.use(cookieParser())


app.get("/health", (_req: Request, res: Response) => {
  res.send("The server is healthy");
});

app.use("/api/admin", adminRouter)
app.use("/api/inquiries", inquiryRouter)

app.use(errorHandler)

export default app